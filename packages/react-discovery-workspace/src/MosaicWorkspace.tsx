import {
  Corner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  updateTree,
} from 'react-mosaic-component'
import {MosaicWindowToolbar, ZeroState} from "."
import React, {ReactElement, useState} from 'react'
import dropRight from 'lodash/dropRight'
import {makeStyles} from "@material-ui/core"
import {useMosaicStyles} from "./styles"

let windowCount = 2

export interface IWorkspaceMosaic {
  currentNode?: MosaicNode<number> | null;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

export const MosaicWorkspace: React.FC<IWorkspaceMosaic> = (props): ReactElement => {
  useMosaicStyles({})
  const classes = useStyles({})
  const initialState: MosaicParent<number> = {
    direction: 'row',
    first: 1,
    second: 2,
    splitPercentage: 50,
  }

  const [currentNode, setCurrentNode] = useState(initialState)

  const onChange = (currentNode: MosaicParent<number> | null): void => {
    setCurrentNode(currentNode);
  }

  const onRelease = (currentNode: MosaicNode<number> | null): void => {
    console.log('Mosaic.onRelease():', currentNode);
  }

  const createNode = (): number => ++windowCount

  const autoArrange = (): void => {
    const leaves = getLeaves(currentNode)
    const newTree: any = createBalancedTreeFromLeaves(leaves)
    setCurrentNode(newTree)
  }

  const addToTopRight = (): void => {
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === 'row') {
        first = destination;
        second = ++windowCount;
      } else {
        first = ++windowCount;
        second = destination;
      }

      updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      createNode();
    }
    setCurrentNode(currentNode);
  }

  const renderTile = (count, path): ReactElement => {
    return (
      <MosaicWindow<number>
        createNode={createNode}
        onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
        onDragStart={() => console.log('MosaicWindow.onDragStart')}
        path={path}
        renderToolbar={() =>
          <div className={classes.root}>
            <MosaicWindowToolbar/>
          </div>}
        title={`Window ${count}`}
      >
        {props.children}
      </MosaicWindow>
    )
  }

  const zeroStateView = <div style={{margin: 'auto', position: 'absolute'}}><ZeroState createNode={createNode}/></div>

  return (
    <div style={{height: '100%', margin: 0, overflow: 'hidden', width: '100%'}}>
      <Mosaic<number>
        onChange={onChange}
        onRelease={onRelease}
        renderTile={(count, path) => renderTile(count, path)}
        value={currentNode}
        zeroStateView={zeroStateView}
      />
    </div>
  )
}

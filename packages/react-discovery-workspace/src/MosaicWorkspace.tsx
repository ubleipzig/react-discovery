import {
  Mosaic,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
} from 'react-mosaic-component'
import {MosaicWindowToolbar, ZeroState} from "."
import React, {ReactElement, Suspense, useState} from 'react'
import {getWorkspaceLayout, getWorkspaceViewIdMap, setWorkspaceLayout} from './state'
import {ESCore} from "@react-discovery/core"
import {createRandomNode} from './utils'
import {makeStyles} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {useMosaicStyles} from "./styles"


export interface IWorkspaceMosaic {
  currentNode?: MosaicNode<number> | null;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

const VIEW_COMPONENT_PATH = './views'

export const MosaicWorkspace: React.FC<IWorkspaceMosaic> = (): ReactElement => {
  const dispatch = useDispatch()
  useMosaicStyles({})
  const classes = useStyles({})
  const hits = ESCore.state.getHits()
  const nodes = hits.hits.map((hit) => hit._source.id)
  const createNode = (): string => nodes && createRandomNode(nodes)
  const initialState: MosaicParent<string> = getWorkspaceLayout()
  const Component = React.lazy((): Promise<any> => import(`${VIEW_COMPONENT_PATH}/View`))
  const viewIdMap = getWorkspaceViewIdMap()
  const [currentNode, setCurrentNode] = useState(initialState)

  const onChange = (currentNode: MosaicParent<string> | null): void => {
    setCurrentNode(currentNode);
    dispatch(setWorkspaceLayout({layout: currentNode}))
  }

  const renderTile = (id, path): ReactElement => {
    return (
      <MosaicWindow<string>
        createNode={createNode}
        path={path}
        renderToolbar={() =>
          <div className={classes.root}>
            <MosaicWindowToolbar/>
          </div>}
        title={`Window ${id}`}
      >
        <Suspense fallback={'loading'}><Component id={id} key={id} viewType={viewIdMap[id]}/></Suspense>
      </MosaicWindow>
    )
  }

  const zeroStateView = <div style={{margin: 'auto', position: 'absolute'}}><ZeroState createNode={createNode}/></div>

  return (
    <div style={{height: '100%', margin: 0, overflow: 'hidden', width: '100%'}}>
      <Mosaic<string>
        onChange={onChange}
        renderTile={(count, path) => renderTile(count, path)}
        value={currentNode}
        zeroStateView={zeroStateView}
      />
    </div>
  )
}

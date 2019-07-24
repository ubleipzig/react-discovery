import {ESCore, usePrevious} from "@react-discovery/core"
import {
  Mosaic,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  createBalancedTreeFromLeaves,
  getLeaves,
} from 'react-mosaic-component'
import {MosaicWindowToolbar, ZeroState} from "."
import React, {ReactElement, Suspense, useEffect, useState} from 'react'
import {getWorkspaceLayout, getWorkspaceViewIdMap, setWorkspaceLayout} from './state'
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
  const workspaceLayout: MosaicParent<string> = getWorkspaceLayout()
  const Component = React.lazy((): Promise<any> => import(`${VIEW_COMPONENT_PATH}/View`))
  const viewIdMap = getWorkspaceViewIdMap()
  const prevViewIdMap = usePrevious(viewIdMap)
  const prevLayout = usePrevious(workspaceLayout)
  const windowPaths = {}

  const buildWorkspaceLayout: any = () => {
    const windowKeys = Object.keys(viewIdMap).sort();
    const leaveKeys = getLeaves(workspaceLayout);
    if (!windowKeys.every(e => leaveKeys.includes(e))
      || !leaveKeys.every(e => windowKeys.includes(e))) {
      return createBalancedTreeFromLeaves(windowKeys);
    }
    return workspaceLayout;
  }

  const bookkeepPath = (viewId, path) => {
    windowPaths[viewId] = path;
  }

  const onChange = (currentNode: MosaicParent<string> | null): void => {
    dispatch(setWorkspaceLayout({layout: currentNode}))
  }

  const renderTile = (id, path): ReactElement => {
    const viewId = viewIdMap && viewIdMap[id]
    bookkeepPath(viewId, path)
    return (
      <MosaicWindow<string>
        createNode={createNode}
        path={path}
        renderToolbar={() =>
          <div className={classes.root}>
            <MosaicWindowToolbar id={id}/>
          </div>}
        title={`Window ${id}`}
      >
        <Suspense fallback={'loading'}><Component id={id} key={id} viewType={viewIdMap[id]}/></Suspense>
      </MosaicWindow>
    )
  }

  useEffect(() => {
    dispatch(setWorkspaceLayout({layout: buildWorkspaceLayout()}))
    if (Object.is(workspaceLayout, prevLayout)) {
      dispatch(setWorkspaceLayout({layout: workspaceLayout}))
      console.log('object is update')
    }

    if (viewIdMap !== prevViewIdMap) {
      dispatch(setWorkspaceLayout({layout: buildWorkspaceLayout()}))
      console.log('remove update')
    }
  }, [workspaceLayout, prevLayout, prevViewIdMap, viewIdMap])

  const zeroStateView = <div style={{margin: 'auto', position: 'absolute'}}><ZeroState createNode={createNode}/></div>

  return (
    <div style={{height: '100%', margin: 0, overflow: 'hidden', width: '100%'}}>
      <Mosaic<string>
        onChange={onChange}
        renderTile={(count, path) => renderTile(count, path)}
        value={workspaceLayout}
        zeroStateView={zeroStateView}
      />
    </div>
  )
}

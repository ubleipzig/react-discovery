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
import React, {ReactElement, Suspense, useEffect} from 'react'
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

  const buildWorkspaceLayout: any = () => {
    const windowInstances = Object.keys(viewIdMap).sort();
    const leaveKeys = getLeaves(workspaceLayout);
    if (windowInstances && (!windowInstances.every(e => leaveKeys.includes(e))
      || !leaveKeys.every(e => windowInstances.includes(e)))) {
      return createBalancedTreeFromLeaves(windowInstances);
    }
    return workspaceLayout;
  }

  const onChange = (currentNode: MosaicParent<string> | null): void => {
    dispatch(setWorkspaceLayout({layout: currentNode}))
  }

  const renderTile = (id, path): ReactElement => {
    const dataId = Object.keys(viewIdMap).length && viewIdMap[id] && viewIdMap[id].id
    const type = Object.keys(viewIdMap).length && viewIdMap[id] && viewIdMap[id].type
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
        <Suspense fallback={'loading'}><Component id={dataId} key={id} viewType={type}/></Suspense>
      </MosaicWindow>
    )
  }

  useEffect(() => {
    dispatch(setWorkspaceLayout({layout: buildWorkspaceLayout()}))
    if (Object.is(workspaceLayout, prevLayout)) {
      dispatch(setWorkspaceLayout({layout: workspaceLayout}))
    }

    if (viewIdMap !== prevViewIdMap) {
      dispatch(setWorkspaceLayout({layout: buildWorkspaceLayout()}))
    }
  }, [workspaceLayout, prevLayout, prevViewIdMap, viewIdMap])

  const zeroStateView = <div style={{margin: 'auto', position: 'absolute'}}><ZeroState createNode={createNode}/></div>

  return (
    <div style={{height: '100%', margin: 0, overflow: 'hidden', width: '100%'}}>
      <Mosaic<string>
        onChange={onChange}
        renderTile={(id, path) => renderTile(id, path)}
        value={workspaceLayout}
        zeroStateView={zeroStateView}
      />
    </div>
  )
}

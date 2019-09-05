import {MosaicParent} from 'react-mosaic-component'
import {useSelector} from "react-redux"

export const getWorkspaceLayout = (): MosaicParent<string> => {
  return useSelector((state: any): MosaicParent<string> => state.workspace.layout)
}

export const getWorkspaceState = (): MosaicParent<string> => {
  return useSelector((state: any): MosaicParent<string> => state.workspace)
}

export const getWorkspaceViewIdMap = (): any => {
  return useSelector((state: any) => state.workspace.viewIdMap)
}

export const getNumberOfWorkspaceNodes = () => {
  return useSelector((state: any) => state.workspace.viewIdMap && Object.keys(state.workspace.viewIdMap).length)
}

export const getIsInWorkspace = (uuid): boolean => {
  return useSelector((state: any) => !!(state.workspace.viewIdMap
    && state.workspace.viewIdMap && Object.values(state.workspace.viewIdMap).filter((instance: any) => instance.id === uuid).length))
}

export const getNumberOfWorkspaceNodesForId = (id) => {
  return useSelector((state: any) => state.workspace.viewIdMap &&
    Object.values(state.workspace.viewIdMap).filter((instance: any) => instance.id === id)).length
}

export const getNumberOfWorkspaceNodesForManifest = (manifest) => {
  return useSelector((state: any) => state.workspace.viewIdMap &&
    Object.values(state.workspace.viewIdMap).filter((instance: any) => instance.manifest === manifest)).length
}

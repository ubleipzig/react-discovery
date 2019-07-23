import {MosaicParent} from 'react-mosaic-component'
import {useSelector} from "react-redux"

export const getWorkspaceLayout = (): MosaicParent<string> => {
  return useSelector((state: any): MosaicParent<string> => state.workspace.layout)
}

export const getWorkspaceViewIdMap = (): any => {
  return useSelector((state: any) => state.workspace.viewIdMap)
}

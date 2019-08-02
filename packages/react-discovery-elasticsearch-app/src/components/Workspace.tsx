import React, {ReactElement} from "react"
import {MosaicWorkspace} from '@react-discovery/workspace'
import {WindowAppBar} from '@react-discovery/iiif'

export const Workspace: React.FC<any> = (): ReactElement => {
  return (
    <MosaicWorkspace
      windowAppBar={WindowAppBar}
    />
  )
}

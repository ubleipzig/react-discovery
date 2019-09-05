import {MosaicWorkspace, setWorkspaceState} from '@react-discovery/workspace'
import React, {ReactElement, useEffect, useState} from "react"
import {WindowAppBar} from '@react-discovery/iiif'
import {useCurrentRoute} from "react-navi"
import {useDispatch} from "react-redux"

export const Workspace: React.FC<any> = (): ReactElement => {
  const route = useCurrentRoute()
  const contentStateQuery = route.url.query.state
  const contentState = contentStateQuery && JSON.parse(window.atob(contentStateQuery))
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect((): void => {
    if (!isInitialized && contentState) {
      dispatch(setWorkspaceState({workspace: contentState}))
      setIsInitialized(true)
    }
  })

  return (
    <MosaicWorkspace
      windowAppBar={WindowAppBar}
    />
  )
}

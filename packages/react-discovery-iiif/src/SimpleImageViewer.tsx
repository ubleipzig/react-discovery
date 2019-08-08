import React, {ReactElement, useEffect, useState} from 'react'
import {ImageServices} from '.'
import {usePrevious} from "@react-discovery/core"

interface ISimpleImageViewer {
  manifest: string;
}

export const SimpleImageViewer: React.FC<ISimpleImageViewer> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentManifest, setCurrentManifest] = useState(undefined)
  const {manifest} = props
  const prevManifest = usePrevious(manifest)

  useEffect((): void => {
    if (!isInitialized && manifest !== prevManifest) {
      setIsInitialized(true)
      setCurrentManifest(manifest)
    }
  }, [manifest])

  return (
    <ImageServices manifest={currentManifest}/>
  )
}

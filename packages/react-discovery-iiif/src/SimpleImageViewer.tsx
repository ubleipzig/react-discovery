import {ImageServices, getCurrentManifestsInCollection} from '.'
import React, {useEffect, useState} from 'react'
import {usePrevious} from "@react-discovery/core"

export const SimpleImageViewer = (props: any) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [manifest, setCurrentManifest] = useState(undefined)
  const manifests = props.manifests || getCurrentManifestsInCollection()
  const prevManifests = usePrevious(manifests)

  useEffect((): void => {
    if (!isInitialized && manifests !== prevManifests) {
      const manifest = manifests[0]
      setIsInitialized(true)
      setCurrentManifest(manifest)
    }
  }, [manifests])

  return (
    <ImageServices manifest={manifest}/>
  )
}

import {IIIFCollectionProvider, ImageServices, ImageServicesProvider, getCurrentManifestsInCollection} from '.'
import React, {useEffect, useState} from 'react'
import {usePrevious} from "@react-discovery/core"

const getRandomItemFromArray = (items: []) => {
  return items[Math.floor(Math.random() * items.length)]
}

export const SimpleImageViewer = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [manifest, setCurrentManifest] = useState(undefined)
  const manifests = getCurrentManifestsInCollection()
  const prevManifests = usePrevious(manifests)

  useEffect((): void => {
    if (!isInitialized && manifests !== prevManifests) {
      const manifest = manifests && getRandomItemFromArray(manifests)
      setIsInitialized(true)
      setCurrentManifest(manifest)
    }
  }, [manifests])

  return (
    <IIIFCollectionProvider>
      <ImageServicesProvider manifest={manifest}>
        <ImageServices/>
      </ImageServicesProvider>
    </IIIFCollectionProvider>
  )
}

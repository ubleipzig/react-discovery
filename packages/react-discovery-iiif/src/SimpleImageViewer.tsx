import {IIIFCollectionProvider, ImageServices, ImageServicesProvider} from '.'
import React, {useEffect, useState} from 'react'
import {getCurrentManifestsInCollection} from "@react-discovery/configuration"

const getRandomItemFromArray = (items: []) => {
  return items[Math.floor(Math.random() * items.length)]
}

export const SimpleImageViewer = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [manifest, setCurrentManifest] = useState(undefined)
  const manifests = getCurrentManifestsInCollection()

  useEffect((): void => {
    if (!isInitialized) {
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

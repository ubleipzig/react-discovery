import data from './__test__/fixtures/oxford.json'
import React, {ReactElement, useEffect, useState} from "react"
import {setCurrentManifestCollection} from '@react-discovery/configuration'
import {useDispatch} from "react-redux"

export const IIIFCollectionProvider: React.FC<any> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (!isInitialized) {
        dispatch(setCurrentManifestCollection({collection: data}))
        setIsInitialized(true)
      }
    },
    [data]
  )

  return (<>{props.children}</>)
}

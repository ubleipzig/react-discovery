import React, {ReactElement, useEffect, useState} from "react"
import {
  fetchImageServices,
  setInApolloRequest,
} from "."
import {useDispatch} from "react-redux"
import uuidv5 from 'uuidv5'

const getUUIDv5 = (uri) => {
  return uuidv5('url', uri)
}

export const ImageServicesProvider: React.FC<any> = (props): ReactElement => {
  const {manifest} = props
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const uuid = manifest && getUUIDv5(manifest)

  useEffect((): void => {
    if (!isInitialized && manifest) {
      const query = `
        query {
          imageServices(manifestId: "${manifest}", type: "ImageService2")  {id, type, profile}
      }`
      const json = JSON.stringify({query})
      dispatch(fetchImageServices.action({json, manifestId: manifest, url: 'https://apollo.iiif.cloud'}))
      dispatch(setInApolloRequest({uuid}))
      setIsInitialized(true)
    }
  }, [fetchImageServices, isInitialized, dispatch, manifest])

  return (
   <>{React.Children.map(props.children, child => {
     return React.cloneElement(child, {uuid})
   })}</>
  )
}

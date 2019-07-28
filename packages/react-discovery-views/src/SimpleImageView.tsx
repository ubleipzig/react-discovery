import React, {ReactElement, useEffect} from "react"
import {SimpleImageViewer} from '@react-discovery/iiif'
import {useDispatch} from "react-redux"
import {Domain} from './enum'
import {ESCore} from "@react-discovery/core"

export const SimpleImageView: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const dispatch = useDispatch()
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const url = process.env.REACT_APP_SEARCH_API_HOST
    + process.env.REACT_APP_SEARCH_API_COLLECTION
    + ESCore.enums.ElasticSearchConstants.DOCUMENT + id

  const manifests = doc && doc._source && doc._source.entities
    .filter((entity) => entity[Domain.TYPE_FIELD] === Domain.DIGITALISAT)
    .map((digitalisat) => digitalisat.digitalisatManifestId_s)

  useEffect((): void => {
    if (!doc) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [doc])

  return manifests && manifests.length ? (<SimpleImageViewer/>) : null
}

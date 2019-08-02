import React, {ReactElement, useEffect} from "react"
import {Domain} from './enum'
import {ESCore} from "@react-discovery/core"
import {SimpleImageViewer} from '@react-discovery/iiif'
import {buildDocumentUri} from "./utils"
import {getCurrentCollection} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"

export const SimpleImageView: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const dispatch = useDispatch()
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const currentCollection = getCurrentCollection()
  const url = buildDocumentUri(currentCollection, id)

  const manifests = doc && doc._source && doc._source.entities
    .filter((entity) => entity[Domain.TYPE_FIELD] === Domain.DIGITALISAT)
    .map((digitalisat) => digitalisat.digitalisatManifestId_s)

  useEffect((): void => {
    if (!doc) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [doc])

  return manifests && manifests.length ? (<SimpleImageViewer manifests={manifests}/>) : null
}

import React, {ReactElement, useEffect} from "react"
import {ESCore} from "@react-discovery/core"
import {SimpleImageViewer} from '@react-discovery/iiif'
import {buildDocumentUri} from "./utils"
import {getCurrentCollection} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"

interface ISimpleImageView {
  id: string;
  manifest: string;
}

export const SimpleImageView: React.FC<ISimpleImageView> = (props): ReactElement => {
  const {id, manifest} = props
  const dispatch = useDispatch()
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const currentCollection = getCurrentCollection()
  const url = buildDocumentUri(currentCollection, id)

  useEffect((): void => {
    if (!doc) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [doc])

  return manifest ? (<SimpleImageViewer manifest={manifest}/>) : null
}

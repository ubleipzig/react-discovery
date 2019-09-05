import React, {ReactElement, useEffect} from "react"
import {ESCore} from "@react-discovery/core"
import {SimpleImageViewer} from '@react-discovery/iiif'
import {buildDocumentUri} from "./utils"
import {useDispatch} from "react-redux"

interface ISimpleImageView {
  collection: string;
  id: string;
  manifest: string;
}

export const SimpleImageView: React.FC<ISimpleImageView> = (props): ReactElement => {
  const {collection, id, manifest} = props
  const dispatch = useDispatch()
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const url = buildDocumentUri(collection, id)

  useEffect((): void => {
    if (!doc) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [doc])

  return manifest ? (<SimpleImageViewer manifest={manifest}/>) : null
}

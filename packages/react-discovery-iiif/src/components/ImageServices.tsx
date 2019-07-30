import {OSDViewer} from '.'
import React from "react"
import gql from 'graphql-tag'
import {makeStyles} from "@material-ui/core"
import {useQuery} from '@apollo/react-hooks'

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
  },
}))

const buildTileSources = (imageServices) => {
  return imageServices && imageServices.map((s: any) =>
    `${s.id}/info.json`)
}
const GET_IMAGE_SERVICES = gql`
          query ImageServices($manifestId: String!, $type: String!) {
            imageServices(manifestId: $manifestId, 
            type: $type)
            {id, type, profile}
          }`

export const ImageServices = (props) => {
  const {manifest} = props
  const response = manifest && useQuery(GET_IMAGE_SERVICES, {
    variables: { manifestId: manifest, type: 'ImageService2' },
  })
  const imageServices = response && response.data && response.data.imageServices
  return imageServices ? (
    <OSDViewer
      images={buildTileSources(imageServices)}
    />
  ) : null
}


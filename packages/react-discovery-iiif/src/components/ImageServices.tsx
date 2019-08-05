import React, {ReactElement} from "react"
import {OSDViewer} from '.'
import gql from 'graphql-tag'
import {makeStyles} from "@material-ui/core"
import {useQuery} from '@apollo/react-hooks'

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
  },
}))

const buildTileSources = (imageServices): string[] => {
  return imageServices && imageServices.map((s: any): string =>
    `${s.id}/info.json`)
}
const GET_IMAGE_SERVICES = gql`
          query ImageServices($manifestId: String!, $type: String!) {
            imageServices(manifestId: $manifestId, 
            type: $type)
            {id, type, profile}
          }`

const GET_IMAGE_SERVICES_V2 = gql`
          query ImageServicesv2($manifestId: String!, $profile: String!) {
            imageServicesv2(manifestId: $manifestId, 
            profile: $profile)
            {id}
          }`
export const ImageServices: React.FC<any> = (props): ReactElement => {
  const {manifest} = props
  const response = manifest && useQuery(GET_IMAGE_SERVICES, {
    variables: { manifestId: manifest, type: 'ImageService2' },
  })
  const responsev2 = manifest && useQuery(GET_IMAGE_SERVICES_V2, {
    variables: {manifestId: manifest, profile: 'http://iiif.io/api/image/2/level2.json'},
  })
  const imageServices = response && response.data && response.data.imageServices

  const imageServicesv2 = responsev2 && responsev2.data && responsev2.data.imageServicesv2

  return imageServices ? (
    <OSDViewer
      images={buildTileSources(imageServices)}
    />
  ) : imageServicesv2 ? (
    <OSDViewer
      images={buildTileSources(imageServicesv2)}
    />
  ) : null
}


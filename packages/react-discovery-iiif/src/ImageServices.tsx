import {OSDViewer} from './components'
import React from "react"
import {Thumbnail} from "@react-discovery/components"
import {getImageServices} from "."
import {makeStyles} from "@material-ui/core"

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
  },
}))

export const ImageServiceItem = (props) => {
  const thumbnailClasses = useThumbnailStyles({})
  const {id} = props
  const thumbnail = id + '/full/300,/0/default.jpg'
  return (
    <Thumbnail
      classes={thumbnailClasses}
      image={thumbnail}
    />
  )
}

const buildTileSources = (imageServices) => {
  return imageServices && imageServices.map((s: any) =>
    `${s.id}/info.json`)
}

export const ImageServices = (props) => {
  const {uuid} = props
  const imageServices = uuid && getImageServices(uuid)
  return (
    <OSDViewer
      images={buildTileSources(imageServices)}
    />
  )
}


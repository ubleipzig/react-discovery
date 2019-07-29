import {OSDViewer} from './components'
import React from "react"
import {getImageServices} from "."
import {makeStyles} from "@material-ui/core"

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

export const ImageServices = (props) => {
  const {uuid} = props
  const imageServices = uuid && getImageServices(uuid)
  return (
    <OSDViewer
      images={buildTileSources(imageServices)}
    />
  )
}


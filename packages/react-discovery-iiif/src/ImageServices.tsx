import React from "react"
import {getImageServices} from "@react-discovery/configuration"
import {Thumbnail} from "@react-discovery/components"
import {Grid, makeStyles} from "@material-ui/core"

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

const buildImageServices = (imageServices) => {
  return imageServices && imageServices.map(
    (s: any, i) =>
      <Grid item key={i} style={{width: '100%'}} xs={3}>
        <ImageServiceItem id={s.id}/>
      </Grid>
  )
}

export const ImageServices = (props) => {
  const {uuid} = props
  const imageServices = uuid && getImageServices(uuid)
  return (
    <Grid
      alignItems="center"
      container
      direction="row"
      justify="center"
      spacing={3}
    >
      {buildImageServices(imageServices)}
    </Grid>
  )
}


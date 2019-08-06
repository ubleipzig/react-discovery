import React, {ReactElement} from "react"
import {CardMedia} from "@material-ui/core"
import {buildThumbnailReference} from "../utils"
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {useThumbnailStyles} from "@react-discovery/components"

interface IThumbnail {
  classes?: any;
  image?: string;
  manifest?: string;
  menuComponent?: ReactElement;
  thumbnail?: string;
}

const GET_THUMBNAIL = gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, profile}}}
          }`
const GET_MANIFEST_SUMMARY = gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {summary}
          }`
export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = props.classes || useThumbnailStyles({})
  const {manifest, menuComponent, thumbnail} = props
  const thumbnailLink = buildThumbnailReference(thumbnail)
  const {data} = !thumbnail && manifest && useQuery(GET_THUMBNAIL, {
    variables: { manifestId: manifest },
  })
  const {data: dataS} = manifest && useQuery(GET_MANIFEST_SUMMARY, {
    variables: { manifestId: manifest },
  })

  return data && dataS ? (
    <div className={classes.cover}>
      {data.manifest && dataS.manifest ? data.manifest.thumbnail.map(
        (t, i) =>
          <CardMedia
            alt="Placeholder"
            className={classes.media}
            component="img"
            image={t.id}
            key={i}
            title={dataS.manifest.summary}
          />) : null
      }
      {menuComponent}
    </div>
  ) : thumbnail && dataS ? (
    <div className={classes.cover}>
      <CardMedia
        alt="Placeholder"
        className={classes.media}
        component="img"
        image={thumbnailLink}
      />
      {menuComponent}
    </div>
  ) : null
}

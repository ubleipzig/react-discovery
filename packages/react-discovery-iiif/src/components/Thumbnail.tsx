import React, {ReactElement} from "react"
import {CardMedia} from "@material-ui/core"
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {useThumbnailStyles} from "@react-discovery/components"

interface IThumbnail {
  classes?: any;
  image?: string;
  manifest?: string;
}

const GET_THUMBNAIL = gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, type, profile}}}
          }`

export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = props.classes || useThumbnailStyles({})
  const {manifest} = props
  const {data} = manifest && useQuery(GET_THUMBNAIL, {
    variables: { manifestId: manifest },
  })
  return data ? (
    <div className={classes.cover}>
      {data.manifest ? data.manifest.thumbnail.map(
        (t, i) =>
          <CardMedia
            alt="Placeholder"
            component="img"
            image={t.id}
            key={i}
            title="Thumbnail"
          />) : null
      }
    </div>
  ) : null
}

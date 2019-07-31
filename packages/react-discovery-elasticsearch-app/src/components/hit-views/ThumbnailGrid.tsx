import {Container, Grid} from "@material-ui/core"
import React, {ReactElement} from "react"
import {Thumbnail} from "@react-discovery/iiif"
import {useThumbnailStyles} from "."

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const {manifest} = props
  const thumbnailClasses = useThumbnailStyles({})
  return (
    <Grid style={{background: 'whitesmoke', flexGrow: 1, padding: 24}}>
      <Container maxWidth="xs">
        <Thumbnail
          classes={thumbnailClasses}
          manifest={manifest}
        />
      </Container>
    </Grid>
  )
}

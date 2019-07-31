import {Container, Grid} from "@material-ui/core"
import {HitViewOptionsMenu, useThumbnailStyles} from "."
import React, {ReactElement} from "react"
import {Thumbnail} from "@react-discovery/iiif"

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const {id, manifest} = props
  const thumbnailClasses = useThumbnailStyles({})
  const component = <HitViewOptionsMenu id={id}/>
  return (
    <Grid style={{background: 'whitesmoke', flexGrow: 1, padding: 24}}>
      <Container maxWidth="xs">
        <Thumbnail
          classes={thumbnailClasses}
          manifest={manifest}
          menuComponent={component}
        />
      </Container>
    </Grid>
  )
}

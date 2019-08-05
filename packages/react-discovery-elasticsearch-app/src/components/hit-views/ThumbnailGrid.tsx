import {Container, Grid, GridListTile} from "@material-ui/core"
import React, {ReactElement} from "react"
import {ImageGridListTitleBar} from "../ImageGridListTitleBar"
import {Thumbnail} from "@react-discovery/iiif"
import {useThumbnailStyles} from "."

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const {hit, item, manifest} = props
  const thumbnailClasses = useThumbnailStyles({})
  const thumbnail = hit && hit._source && hit._source.thumbnail
  return hit && item ? (
    <Grid style={{background: 'whitesmoke', flexGrow: 1, padding: 24}}>
      <Container maxWidth="xs">
        <GridListTile
          style={{listStyle: 'none'}}
        >
          <Thumbnail
            classes={thumbnailClasses}
            manifest={manifest}
            thumbnail={thumbnail}
          />
          <ImageGridListTitleBar hit={hit} item={item} titlePosition='top'/>
        </GridListTile>
      </Container>
    </Grid>
  ) : null
}

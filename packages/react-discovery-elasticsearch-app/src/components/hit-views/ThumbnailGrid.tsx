import {Container, Grid, GridListTile} from "@material-ui/core"
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/core"
import {ImageGridListTitleBar} from "../ImageGridListTitleBar"
import {Thumbnail} from "@react-discovery/iiif"
import {useThumbnailStyles} from "."

interface IThumbnailGrid {
  hit: IHit;
  id: string;
  item: any;
  manifest: string;
}

export const ThumbnailGrid: React.FC<IThumbnailGrid> = (props): ReactElement => {
  const {hit, id, item, manifest} = props
  const thumbnailClasses = useThumbnailStyles({})
  const thumbnail = hit && hit._source && hit._source.thumbnail
  return hit && item ? (
    <Grid style={{background: 'whitesmoke', flexGrow: 1, padding: 24}}>
      <Container maxWidth="xs">
        <GridListTile
          style={{
            display: 'table-cell',
            listStyle: 'none'}}
        >
          <Thumbnail
            classes={thumbnailClasses}
            id={id}
            manifest={manifest}
            thumbnail={thumbnail}
          />
          <ImageGridListTitleBar hit={hit} item={item}/>
        </GridListTile>
      </Container>
    </Grid>
  ) : null
}

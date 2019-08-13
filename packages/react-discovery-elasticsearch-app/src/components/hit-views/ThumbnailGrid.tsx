import {Container, Grid, GridListTile} from "@material-ui/core"
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/core"
import {MediaGridTitleBar} from "../MediaGridTitleBar"
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
  const thumbnailClasses: any = useThumbnailStyles({})
  const thumbnail = hit && hit._source && hit._source.thumbnail
  return hit && item ? (
    <Grid className={thumbnailClasses.root}>
      <Container maxWidth="xs">
        <GridListTile
          className={thumbnailClasses.gridList}
        >
          <Thumbnail
            classes={thumbnailClasses}
            id={id}
            manifest={manifest}
            thumbnail={thumbnail}
          />
          <MediaGridTitleBar hit={hit} item={item}/>
        </GridListTile>
      </Container>
    </Grid>
  ) : null
}

import {Container, Grid, GridListTile} from "@material-ui/core"
import React, {ReactElement} from "react"
import {Domain} from "@react-discovery/views"
import {ESCore} from "@react-discovery/core"
import {ImageGridListTitleBar} from "../ImageGridListTitleBar"
import {Thumbnail} from "@react-discovery/iiif"
import {useThumbnailStyles} from "."

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const {hit, manifest} = props
  const media = hit && hit._source && hit._source.entities
    .filter((entity) => entity[typeField] === Domain.DIGITALISAT)
  const item = media.length && media[0]
  const thumbnailClasses = useThumbnailStyles({})
  return (
    <Grid style={{background: 'whitesmoke', flexGrow: 1, padding: 24}}>
      <Container maxWidth="xs">
        <GridListTile
          style={{listStyle: 'none'}}
        >
          <Thumbnail
            classes={thumbnailClasses}
            manifest={manifest}
          />
          <ImageGridListTitleBar hit={hit} item={item}/>
        </GridListTile>
      </Container>
    </Grid>
  )
}

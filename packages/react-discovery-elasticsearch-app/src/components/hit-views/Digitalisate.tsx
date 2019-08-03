import {GridListTile, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {Domain} from "@react-discovery/views"
import {ESCore} from "@react-discovery/core"
import {ImageGridListTitleBar} from "../ImageGridListTitleBar"
import {Thumbnail} from "@react-discovery/iiif"

const useStyles = makeStyles(theme => ({
  cover: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    padding: 36,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
  media: {
    borderRadius: 8,
    maxWidth: 180,
    objectFit: 'cover',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

export const Digitalisate: React.FC<any> = (props): ReactElement => {
  const classes = useStyles({})
  const {hit} = props
  const media = hit && hit._source && hit._source.entities
    .filter((entity) => entity[typeField] === Domain.DIGITALISAT)

  const buildMediaGridList = (): ReactElement[] => {
    return media.map((item, i) => (
      <GridListTile
        key={i}
        style={{listStyle: 'none'}}
      >
        <Thumbnail
          classes={classes}
          manifest={item[Domain.MANIFEST_ID_FIELD]}/>
        <ImageGridListTitleBar
          hit={hit}
          item={item}
        />
      </GridListTile>
    ))
  }

  return (
    <div className={classes.root}>
      {buildMediaGridList()}
    </div>
  )
}

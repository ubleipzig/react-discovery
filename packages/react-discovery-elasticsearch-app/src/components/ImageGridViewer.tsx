import {Grid, IconButton, makeStyles, withStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {SingleImageOSDViewer, buildTileSourceForGridViewerImage, } from "@react-discovery/iiif"
import {getCurrentGridViewerImage, setCurrentGridViewerImage} from "@react-discovery/configuration"
import {Close} from "@material-ui/icons"
import {ViewTypeSwitcher} from "./ViewTypeSwitcher"
import {useDispatch} from "react-redux"
import uuid from 'uuid'

const useStyles = makeStyles((): any => ({
  closeIcon: {
    display: 'flex',
    left: 10,
    position: 'absolute',
    right: 0,
    zIndex: 500
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: 0
  },
  gridRoot: {
    background: '#eee',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    width: '100%'
  },
  gridViewer: {
    flexGrow: 1,
    height: '100vh',
    position: 'sticky',
    top: 70
  }
}))

const ColoredButton = withStyles(() => ({
  root: {
    color: 'white',
  },
}))(IconButton)

export const ImageGridViewer: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const currentGridViewerImage = getCurrentGridViewerImage()
  const image = currentGridViewerImage && buildTileSourceForGridViewerImage(currentGridViewerImage)
  const dispatch = useDispatch()

  const handleRemove = (): void => {
    dispatch(setCurrentGridViewerImage({gridViewerImage: null}))
  }

  const buildCloseIcon = (): ReactElement => {
    return (
      <div className={classes.closeIcon}>
        <ColoredButton
          aria-label="Remove"
          className={classes.menuButton}
          color="primary"
          edge="start"
          onClick={handleRemove}>
          <Close/>
        </ColoredButton>
      </div>
    )
  }

  return (
    <Grid
      className={classes.flexSection}
      container
    >
      {image ?
        <>
          <Grid className={classes.gridRoot} item xs={7}>
            <ViewTypeSwitcher/>
          </Grid>
          <Grid className={classes.gridViewer} item xs={5}>
            {buildCloseIcon()}
            <SingleImageOSDViewer image={image} key={uuid()}/>
          </Grid>
        </> :
        <Grid className={classes.gridRoot} item xs={12}>
          <ViewTypeSwitcher/>
        </Grid>
      }
    </Grid>
  )
}

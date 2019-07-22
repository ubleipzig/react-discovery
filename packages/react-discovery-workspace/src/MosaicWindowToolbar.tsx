import {AppBar, IconButton, Toolbar, makeStyles} from "@material-ui/core"
import {Autorenew, Close, VerticalSplit, ZoomOutMap} from "@material-ui/icons"
import {
  MosaicContext,
  MosaicWindowContext,
} from 'react-mosaic-component'
import React, {ReactElement} from "react"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#FFF'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}))

export const MosaicWindowToolbar = (): ReactElement => {
  const classes = useStyles({})
  return (
    <AppBar
      classes={{colorPrimary: classes.appBar}}
      position="static"
    >
      <MosaicContext.Consumer>
        {({mosaicActions}) => (
          <MosaicWindowContext.Consumer>
            {({mosaicWindowActions}) => (
              <Toolbar variant="dense">
                <div className={classes.grow}/>
                <IconButton
                  aria-label="Replace"
                  className={classes.menuButton}
                  color="primary"
                  edge="start"
                  href=''
                  onClick={() => mosaicWindowActions.replaceWithNew()}>
                  <Autorenew/>
                </IconButton>
                <IconButton
                  aria-label="Split"
                  className={classes.menuButton}
                  color="primary"
                  edge="start"
                  href=''
                  onClick={() => mosaicWindowActions.split()}>
                  <VerticalSplit/>
                </IconButton>
                <IconButton
                  aria-label="Expand"
                  className={classes.menuButton}
                  color="primary"
                  edge="start"
                  href=''
                  onClick={() => mosaicActions.expand(mosaicWindowActions.getPath())}>
                  <ZoomOutMap/>
                </IconButton>
                <IconButton
                  aria-label="Remove"
                  className={classes.menuButton}
                  color="primary"
                  edge="start"
                  href=''
                  onClick={() => mosaicActions.remove(mosaicWindowActions.getPath())}>
                  <Close/>
                </IconButton>
              </Toolbar>
            )}
          </MosaicWindowContext.Consumer>)}
      </MosaicContext.Consumer>
    </AppBar>
  )
}

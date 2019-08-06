import {AppBar, IconButton, Toolbar, Typography, makeStyles} from "@material-ui/core"
import {Autorenew, Close, VerticalSplit, ZoomOutMap} from "@material-ui/icons"
import {
  MosaicContext,
  MosaicWindowContext,
} from 'react-mosaic-component'
import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {buildHighlightedValueForHit} from "@react-discovery/components"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme): any => ({
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
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    maxWidth: '65%'
  },
}))

export const WindowAppBar = (props): ReactElement => {
  const classes: any = useStyles({})
  const {dataId, id, removeViewId} = props
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[dataId] : null
  const title = doc && (buildHighlightedValueForHit('titel_t', doc) || buildHighlightedValueForHit('title', doc))
  const dispatch = useDispatch()

  const handleRemove = (): void => {
    dispatch(removeViewId({id}))
  }

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
                <Typography
                  className={classes.title}
                  color='primary'
                  noWrap
                  variant="button"
                >
                  {title}
                </Typography>
                <div className={classes.grow}/>
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
                  onClick={handleRemove}>
                  <Close/>
                </IconButton>
              </Toolbar>
            )}
          </MosaicWindowContext.Consumer>)}
      </MosaicContext.Consumer>
    </AppBar>
  )
}

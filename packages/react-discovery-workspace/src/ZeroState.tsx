import {Fab, Toolbar, makeStyles, } from "@material-ui/core"
import React, {ReactElement} from 'react'
import {Add} from "@material-ui/icons"
import {MosaicContext} from 'react-mosaic-component'
import noop from 'lodash/noop'

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
  root: {
    flexGrow: 1,
  },
}))

export const ZeroState: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {createNode} = props

  const replace = (mosaicActions) =>
    Promise.resolve(createNode())
      .then((node) => mosaicActions.replaceWith([], node))
      .catch(noop)

  return (
    <MosaicContext.Consumer>
      {({mosaicActions}) => (
        <Toolbar variant="dense">
          <div className={classes.grow}/>
          <Fab
            aria-label="Add"
            className={classes.menuButton}
            onClick={() => replace(mosaicActions)}
            size="small"
            variant="extended"
          >
            <Add/>
            Add New Window
          </Fab>
        </Toolbar>
      )}
    </MosaicContext.Consumer>
  )
}

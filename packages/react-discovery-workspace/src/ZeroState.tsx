import {Fab, Toolbar, makeStyles, } from "@material-ui/core"
import React, {ReactElement} from 'react'
import {Add} from "@material-ui/icons"
import noop from 'lodash/noop'
import {setViewIdMap} from "./state/actions"
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
  root: {
    flexGrow: 1,
  },
}))

export const ZeroState: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const {createNode} = props
  const handleAddToWorkspace = (): any => {
    Promise.resolve(createNode())
      .then((node) => dispatch(setViewIdMap({id: node, manifest: null, type: 'data'})))
      .catch(noop)
  }

  return (
    <Toolbar variant="dense">
      <div className={classes.grow}/>
      <Fab
        aria-label="Add"
        className={classes.menuButton}
        onClick={(): Promise<any> => handleAddToWorkspace()}
        size="small"
        variant="extended"
      >
        <Add/>
        Add New Window
      </Fab>
    </Toolbar>
  )
}

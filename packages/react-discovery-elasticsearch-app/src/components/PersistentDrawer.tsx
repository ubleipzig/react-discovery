import {Drawer, List, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {DrawerListItems} from "./DrawerListItems"
import clsx from 'clsx'

const drawerWidth = 240

const useStyles = makeStyles((theme): any => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerClose: {
    marginTop: 56,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerOpen: {
    marginTop: 56,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: drawerWidth,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 12px',
    ...theme.mixins.toolbar,
  },
}))

export const PersistentDrawer: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {open} = props

  return (
    <Drawer
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
      variant="permanent"
    >
      <List style={{padding: 8}}>
        <DrawerListItems/>
      </List>
    </Drawer>
  )
}

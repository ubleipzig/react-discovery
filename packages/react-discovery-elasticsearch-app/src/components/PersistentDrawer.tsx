import {Collections, EditLocation, Home, PictureInPicture} from "@material-ui/icons"
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core"
import React, {ReactElement, forwardRef} from "react"
import { NavLink } from 'react-navi'
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
  const listItems = [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
    {
      id: 'albums',
      index: 1,
      path: '/',
      text: 'Gallery'
    },
    {
      id: 'editAnnotations',
      index: 2,
      path: '/',
      text: 'Annotate'
    },
    {
      id: 'workspace',
      index: 3,
      path: '/workspace',
      text: 'Workspace'
    },
  ]

  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'albums':
        return <Collections/>
      case 'editAnnotations':
        return <EditLocation/>
      case 'workspace':
        return <PictureInPicture/>
    }
  }

  const buildListItems = (items: any): ReactElement[] => {
    return items.map((item: any): ReactElement =>
      <ListItem
        button
        component={forwardRef((props: any, ref: any) => <NavLink href={item.path} {...props} ref={ref} />) as any}
        key={item.index}
        style={{color: '#2f2c2c', textDecoration: 'none'}}
      >
        <ListItemIcon>
          {buildListItemIcon(item.id)}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    )
  }

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
        {buildListItems(listItems)}
      </List>
    </Drawer>
  )
}

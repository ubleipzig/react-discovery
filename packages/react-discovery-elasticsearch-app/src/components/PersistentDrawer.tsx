import {Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core"
import {Collections, EditLocation, Home, PictureInPicture, Search} from "@material-ui/icons"
import React, {ReactElement, forwardRef} from "react"
import { NavLink } from 'react-navi'
import clsx from 'clsx'
import {getNumberOfWorkspaceNodes} from '@react-discovery/workspace'
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
  const numberOfNodes = getNumberOfWorkspaceNodes()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const {open} = props
  const listItems = [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
    {
      id: 'search',
      index: 1,
      path: '/search',
      text: 'search'
    },
    {
      id: 'albums',
      index: 2,
      path: '/',
      text: 'Gallery'
    },
    {
      id: 'editAnnotations',
      index: 3,
      path: '/',
      text: 'Annotate'
    },
    {
      id: 'workspace',
      index: 4,
      path: '/workspace',
      text: 'Workspace'
    },
  ]

  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'search':
        return <Search/>
      case 'albums':
        return <Collections/>
      case 'editAnnotations':
        return <EditLocation/>
      case 'workspace':
        return (
          <Badge
            badgeContent={numberOfNodes}
            color="secondary"
          >
            <PictureInPicture/>
          </Badge>
        )
    }
  }

  const handleListItemClick = ({}, index) => {
    setSelectedIndex(index);
  }

  const buildListItems = (items: any): ReactElement[] => {
    return items.map((item: any, i): ReactElement =>
      <ListItem
        button
        component={forwardRef((props: any, ref: any) => <NavLink href={item.path} {...props} ref={ref} />) as any}
        key={item.index}
        onClick={(event): void => handleListItemClick(event, i)}
        selected={selectedIndex === i}
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

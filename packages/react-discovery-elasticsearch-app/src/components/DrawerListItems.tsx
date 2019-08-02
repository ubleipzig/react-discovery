import {Badge, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core"
import {Collections, EditLocation, Home, PictureInPicture, Search, Settings} from "@material-ui/icons"

import {NavLink, useCurrentRoute} from "react-navi"
import React, {ReactElement, forwardRef, useEffect, useState} from "react"
import {getNumberOfWorkspaceNodes} from "@react-discovery/workspace"
import {usePrevious} from "@react-discovery/core"
import {useTranslation} from "react-i18next"

export const DrawerListItems: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const route = useCurrentRoute()
  const prevRoute = usePrevious(route)
  const numberOfNodes = getNumberOfWorkspaceNodes()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const {t} = useTranslation('common')

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
      text: 'Search'
    },
    {
      id: 'workspace',
      index: 2,
      path: '/workspace',
      text: 'Workspace'
    },
    {
      id: 'albums',
      index: 3,
      path: '/',
      text: 'Gallery'
    },
    {
      id: 'editAnnotations',
      index: 4,
      path: '/',
      text: 'Annotate'
    },
    {
      id: 'settings',
      index: 5,
      path: '/settings',
      text: 'Settings'
    },
  ]

  useEffect((): any => {
    if (!isInitialized) {
      const pathname = route.url.pathname
      const [startItem] = listItems.filter((item) => item.path === pathname)
      setSelectedIndex(startItem.index)
      setIsInitialized(true)
    }
    if (route !== prevRoute) {
      const pathname = route.url.pathname
      const [startItem] = listItems.filter((item) => item.path === pathname)
      setSelectedIndex(startItem.index)
    }
  }, [route, prevRoute])


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
      case 'settings':
        return <Settings/>
    }
  }

  const handleListItemClick = ({}, index) => {
    setSelectedIndex(index);
  }

  // eslint-disable-next-line react/display-name
  const navRef = (item) => forwardRef((props: any, ref: any) => <NavLink href={item.path} {...props} ref={ref} />)

  const buildListItems = (items: any): ReactElement[] => {
    return items.map((item: any, i): ReactElement =>
      <ListItem
        button
        component={navRef(item)}
        key={item.index}
        onClick={(event): void => handleListItemClick(event, i)}
        selected={selectedIndex === i}
        style={{color: '#2f2c2c', textDecoration: 'none'}}
      >
        <Tooltip
          key={item.key}
          title={t(item.text)}>
          <ListItemIcon>
            {buildListItemIcon(item.id)}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={t(item.text)} />
      </ListItem>
    )
  }

  return (
    <>{buildListItems(listItems)}</>
  )
}

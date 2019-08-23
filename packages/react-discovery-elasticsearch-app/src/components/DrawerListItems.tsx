import {Badge, ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core"
import {Collections, Description, Home, PictureInPicture, Search, Settings} from "@material-ui/icons"
import {NavLink, useCurrentRoute} from "react-navi"
import React, {ReactElement, forwardRef, useEffect, useState} from "react"
import {getCurrentSearchContext} from '@react-discovery/configuration'
import {getNumberOfWorkspaceNodes} from "@react-discovery/workspace"
import {usePrevious} from "@react-discovery/core"
import {useTranslation} from "react-i18next"

export const DrawerListItems: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const currentSearchContext = getCurrentSearchContext()
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
      id: 'collections',
      index: 1,
      path: '/collections',
      text: 'Collections'
    },
    {
      id: 'search',
      index: 2,
      path: currentSearchContext,
      text: 'Search'
    },
    {
      id: 'workspace',
      index: 3,
      path: '/workspace',
      text: 'Workspace'
    },
    {
      id: 'detail',
      index: 4,
      path: '/detail',
      text: 'Detail'
    },
    {
      id: 'settings',
      index: 5,
      path: '/settings',
      text: 'Settings'
    },
  ]

  useEffect((): any => {
    const pathname = route.url.pathname
    const context = pathname.split('/')[1]
    const [startItem] = listItems.filter((item): boolean => item.path.includes(context))

    if (!isInitialized) {
      startItem ? setSelectedIndex(startItem.index) : setSelectedIndex(0)
      setIsInitialized(true)
    }
    if (route !== prevRoute) {
      startItem && setSelectedIndex(startItem.index)
    }
  }, [route, prevRoute])


  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'collections':
        return <Collections/>
      case 'search':
        return <Search/>
      case 'workspace':
        return (
          <Badge
            badgeContent={numberOfNodes}
            color="secondary"
          >
            <PictureInPicture/>
          </Badge>
        )
      case 'detail':
        return <Description/>
      case 'settings':
        return <Settings/>
    }
  }

  const handleListItemClick = ({}, index): void => {
    setSelectedIndex(index);
  }

  // eslint-disable-next-line react/display-name
  const navRef = (item) => item.path !== '/detail' ? forwardRef((props: any, ref: any) => <NavLink href={item.path} {...props} ref={ref} />) : 'li'

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

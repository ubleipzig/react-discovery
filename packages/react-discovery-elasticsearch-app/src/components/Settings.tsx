import {ESCore, IElasticSearchQuery, usePrevious} from "@react-discovery/core"
import {FormControl, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, makeStyles} from "@material-ui/core"
import {
  ICollection,
  getCollectionByKey,
  getCollections,
  getCurrentCollection,
  setCurrentCollection
} from '@react-discovery/configuration'
import React, {ReactElement, useEffect} from "react"
import {Search} from "@material-ui/icons"
import {useDispatch} from 'react-redux'

const useStyles = makeStyles(theme => ({
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 640,
    minWidth: 400,
  },
}))

export const Settings: React.FC<any> = (): ReactElement => {
  const classes = useStyles({})
  const currentCollection = getCurrentCollection()
  const prevCollection = usePrevious(currentCollection)
  const collections = getCollections()
  const collectionObj = getCollectionByKey(currentCollection)
  const dispatch = useDispatch()

  const getIndexNames = (): any => {
    const map = new Map()
    Object.keys(collections).forEach((key: string) => {
      map.set(key, (collections[key] as ICollection).name)
    })
    return new Map([...map.entries()].sort())
  }
  const indexMap = getIndexNames()

  useEffect((): void => {
    if (prevCollection !== currentCollection) {
      const {initialFilter, refinementListFilters, searchFields, sortFields} = collectionObj
      const aggs = ESCore.builders.buildAggs(refinementListFilters)
      const qs: IElasticSearchQuery = {
        aggs,
        filters: initialFilter || {},
        from: 0,
        searchFields,
        size: 20,
        sortFields,
        stringInput: null,
      }
      dispatch(ESCore.state.setQueryFields({...qs}))
    }
  }, [prevCollection, currentCollection])

  const buildSelectOptions = (): any => {
    return Array.from(indexMap, ([key, value]) =>
      <MenuItem
        button={false}
        component='li'
        key={key}
        value={key}
      >
        <ListItemText classes={{primary: classes.primary}}>{value}</ListItemText>
      </MenuItem>)
  }

  const handleChange = (event) => {
    const currentCollection = event.target.value as string
    dispatch(setCurrentCollection({currentCollection}))
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Select Collection" />
          <FormControl>
            <Select
              MenuProps={{
                anchorOrigin: {
                  horizontal: "left",
                  vertical: "bottom",
                },
                getContentAnchorEl: null,
              }}
              inputProps={{
                id: 'index-native',
                name: 'currentIndex',
              }}
              onChange={handleChange}
              value={currentCollection}
            >
              {buildSelectOptions()}
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </div>
  )
}

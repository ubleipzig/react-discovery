import {ESCore, IElasticSearchQuery, usePrevious} from "@react-discovery/core"
import {FormControl, ListItemText, MenuItem, Select, makeStyles} from "@material-ui/core"
import {
  ICollection,
  getCollectionByKey,
  getCollections,
  getCurrentCollection,
  getCurrentSearchContext,
  setCurrentCollection,
} from "@react-discovery/configuration"
import React, {ReactElement, useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {useNavigation} from "react-navi"

const useStyles = makeStyles((): any => ({
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem'
  },
}))

export const CollectionSelector: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()
  const classes: any = useStyles({})
  const collections = getCollections()
  const currentCollection = getCurrentCollection()
  const collectionObj = getCollectionByKey(currentCollection)
  const currentSearchContext = getCurrentSearchContext()
  const jsonCollection = JSON.stringify(collectionObj)
  const prevJsonCollection = usePrevious(jsonCollection)
  const navigation = useNavigation()
  const size = ESCore.state.getSize()

  useEffect((): void => {
    if (!isInitialized) {
      setIsInitialized(true)
    }
    if (prevJsonCollection !== jsonCollection) {
      const {initialFilter, refinementListFilters, searchFields, sortFields} = collectionObj
      const aggs = ESCore.builders.buildAggs(refinementListFilters)
      const qs: IElasticSearchQuery = {
        aggs,
        filters: initialFilter || {},
        from: 0,
        searchFields,
        size: size || 20,
        sortFields,
        stringInput: null,
      }
      dispatch(ESCore.state.setQueryFields({...qs}))
      if (isInitialized) {
        navigation.navigate(currentSearchContext)
      }
    }
  }, [prevJsonCollection, jsonCollection])

  const getIndexNames = (): any => {
    const map = new Map()
    const sortStringValues = (a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1
    Object.keys(collections).forEach((key: string) => {
      map.set(key, (collections[key] as ICollection).name)
    })
    return new Map([...map].sort(sortStringValues))
  }
  const indexMap = getIndexNames()

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

  const handleIndexChange = (event): void => {
    const currentCollection = event.target.value as string
    dispatch(setCurrentCollection({currentCollection}))
  }

  return (
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
        onChange={handleIndexChange}
        value={currentCollection}
      >
        {buildSelectOptions()}
      </Select>
    </FormControl>
  )
}

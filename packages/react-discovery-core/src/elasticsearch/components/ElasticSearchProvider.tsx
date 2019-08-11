import React, {ReactElement, useEffect, useState} from "react"
import {buildAggs, queryBuilder} from "../query-builders"
import {fetchElasticSearchResponse, getDefaultQuery, getFrom, getSize, getStringInput, setQueryFields} from "../state"
import {getCollections, getCurrentCollection, getCurrentSearchContext, setCurrentCollection, setSelectedIndex} from "@react-discovery/configuration"
import {useCurrentRoute, useNavigation} from 'react-navi'
import {ElasticSearchConstants} from "../enum"
import {IElasticSearchQuery} from "../index"
import {pushHistory} from "../../history"
import {useDispatch} from 'react-redux'
import {usePrevious} from '../../hooks'

interface IElasticSearchProvider {
  useHistory?: boolean;
}

export const ElasticSearchProvider: React.FC<IElasticSearchProvider> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const {useHistory} = props
  const from = getFrom()
  const size = getSize()
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const stringInput = getStringInput()
  const query: IElasticSearchQuery = getDefaultQuery()
  const queryObj = queryBuilder(query)
  const json = JSON.stringify(queryObj)
  const prevJson = usePrevious(json)
  const collections = getCollections()
  const currentCollection = getCurrentCollection()
  const currentSearchContext = getCurrentSearchContext()
  const dispatch = useDispatch()

  const fetchResponse = (url): boolean => {
    dispatch(fetchElasticSearchResponse.action({json, url}))
    return true
  }

  const initSearchFromRoute = (): string => {
    const urlStart = route.url.query.start ? Number.parseInt(route.url.query.start) : 0
    const currentPage = urlStart ? urlStart / size : 0
    const pathnameParts = route.url.pathname.split('/')
    const q = route.url.query.q || pathnameParts[3]
    const urlCollection = pathnameParts[2] || process.env.REACT_APP_SEARCH_API_COLLECTION
    urlCollection && dispatch(setCurrentCollection({currentCollection: urlCollection}))
    const url = process.env.REACT_APP_SEARCH_API_HOST + urlCollection + ElasticSearchConstants.SEARCH
    const {initialFilter, refinementListFilters, searchFields, sortFields} = collections[urlCollection]
    const aggs = buildAggs(refinementListFilters)
    const initialQueryState: IElasticSearchQuery = {
      aggs,
      filters: initialFilter || {},
      from: urlStart,
      searchFields,
      size: size || 20,
      sortFields,
      stringInput: q,
    }
    dispatch(setQueryFields({...initialQueryState}))
    dispatch(setSelectedIndex({selectedIndex: currentPage}))
    return url
  }

  useEffect((): void => {
    if (!isInitialized) {
      const url = initSearchFromRoute()
      fetchResponse(url)
      setIsInitialized(true)
    } else {
      const url = process.env.REACT_APP_SEARCH_API_HOST + currentCollection + ElasticSearchConstants.SEARCH
      if (useHistory && pathname === currentSearchContext) {
        pushHistory(navigation, currentSearchContext, stringInput, from)
      }
      if (prevJson !== json) {
        fetchResponse(url)
      }
    }
  }, [json, prevJson, size])

  return (
    <>
      {props.children}
    </>
  )
}

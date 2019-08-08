import React, {ReactElement, useEffect, useState} from "react"
import {buildQueryStringObject, pushHistory} from "../../history"
import {fetchElasticSearchResponse, getDefaultQuery, getFrom, getSize, getStringInput} from "../state"
import {getCurrentCollection, getRootContext, setSelectedIndex} from "@react-discovery/configuration"
import {useCurrentRoute, useNavigation} from 'react-navi'
import {ElasticSearchConstants} from "../enum"
import {IElasticSearchQuery} from "../index"
import {queryBuilder} from "../query-builders"
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
  const rootContext = getRootContext()
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const urlStart = route.url.query.start ? Number.parseInt(route.url.query.start) : 0
  const qString = buildQueryStringObject(route, from)
  const stringInput = getStringInput()
  const query: IElasticSearchQuery = getDefaultQuery()
  const mergedQuery = {...query, ...qString}
  const queryObj = queryBuilder(mergedQuery)
  const json = JSON.stringify(queryObj)
  const prevJson = usePrevious(json)
  const currentCollection = getCurrentCollection()
  const url = process.env.REACT_APP_SEARCH_API_HOST + currentCollection + ElasticSearchConstants.SEARCH
  const dispatch = useDispatch()

  const fetchResponse = (): boolean => {
    dispatch(fetchElasticSearchResponse.action({json, url}))
    return true
  }

  useEffect((): void => {
    if (!isInitialized) {
      const currentPage = urlStart ? urlStart / size : 0
      dispatch(setSelectedIndex({selectedIndex: currentPage}))
      fetchResponse()
      setIsInitialized(true)
    } else {
      if (useHistory && pathname === rootContext) {
        pushHistory(navigation, stringInput, from, rootContext)
      }
      if (prevJson !== json) {
        fetchResponse()
      }
    }
  }, [json, prevJson, urlStart, size])

  return (
    <>
      {props.children}
    </>
  )
}

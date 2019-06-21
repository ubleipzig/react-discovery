import React, {ReactElement, useEffect, useState} from "react"
import {
  fetchSolrResponseWorker,
  fetchSolrSuggestionsWorker,
  getFilters,
  getRootContext,
  getSelectedIndex,
  getSize,
  getSortFields,
  getStart,
  getStringInput,
  getSuggest,
  setQueryFields,
  setSelectedIndex
} from "../state"
import {queryBuilder, suggestQueryBuilder} from "../query-builders"
import {useCurrentRoute, useNavigation} from 'react-navi'
import {IQuery} from ".."
import {getDefaultQuery} from "../state/selectors"
import {pushHistory} from "../history"
import {useDispatch} from 'react-redux'
import {usePrevious} from "../hooks"
const isEqual = require('lodash/isEqual')

interface ISolrResponseProvider {
  useHistory?: boolean;
}

export const SolrResponseProvider: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {useHistory} = props
  const rootContext = getRootContext()
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const urlStart = route.url.query.start ? Number.parseInt(route.url.query.start) : 0
  const qString = {
    start: urlStart,
    stringInput: route.url.query.q ? route.url.query.q : null
  }
  const start = getStart()
  const query: IQuery = getDefaultQuery()
  const dispatch = useDispatch()
  const stringInput = getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const selectedIndex = getSelectedIndex()
  const prevSelectedIndex = usePrevious(selectedIndex)
  const size = getSize()
  const suggest = getSuggest()
  const filters = getFilters()
  const prevFilters = usePrevious(filters)
  const sortFields = getSortFields()
  const prevSortFields = usePrevious(sortFields)
  const [isInitialized, setIsInitialized] = useState(false)
  const mergedQuery = {...query, ...qString}

  const fetchResponse = (requestURI): boolean => {
    dispatch(fetchSolrResponseWorker({requestURI}))
    return true
  }

  const fetchSuggestions = (requestURI): boolean => {
    dispatch(fetchSolrSuggestionsWorker({requestURI}))
    return true
  }

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(setQueryFields({...mergedQuery}))
      const currentPage = urlStart ? urlStart / size : 0
      dispatch(setSelectedIndex({selectedIndex: currentPage}))
      const responseRequestURI = queryBuilder({...mergedQuery})
      fetchResponse(responseRequestURI)
      setIsInitialized(true)
    } else {
      if (prevSelectedIndex !== selectedIndex || prevStringInput !== stringInput
        || filters !== prevFilters || prevSortFields !== sortFields) {
        if (useHistory && pathname === '/') {
          pushHistory(navigation, stringInput, start, rootContext)
        }
        if (!isEqual(mergedQuery, query) || filters !== prevFilters
          || prevSortFields !== sortFields || prevStringInput !== stringInput) {
          const responseRequestURI = queryBuilder({...query})
          fetchResponse(responseRequestURI)
        }
      }
    }

    if (suggest && prevStringInput !== stringInput) {
      const suggestionsRequestURI = suggestQueryBuilder({...query})
      fetchSuggestions(suggestionsRequestURI)
    }
  }, [fetchResponse, fetchSuggestions, isInitialized, prevSelectedIndex, selectedIndex, prevStringInput,
    pushHistory, prevFilters, filters, prevSortFields, sortFields, qString, query, stringInput])

  return (
    <>
      {props.children}
    </>
  )
}


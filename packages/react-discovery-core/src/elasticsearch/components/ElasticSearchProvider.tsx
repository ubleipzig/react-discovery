import React, {ReactElement, useEffect, useState} from "react"
import {fetchElasticSearchResponse, getStringInput} from "../state"
import {getDefaultQuery, getFilters, getFrom, getSize, getSortFields} from "../state/selectors"
import {ElasticSearchConstants} from "../enum"
import {IElasticSearchQuery} from "../index"
import {getCurrentCollection} from "@react-discovery/configuration"
import {queryBuilder} from "../query-builders"
import {useDispatch} from 'react-redux'
import {usePrevious} from '../../hooks'

interface IElasticSearchProvider {
  useHistory?: boolean;
}

export const ElasticSearchProvider: React.FC<IElasticSearchProvider> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const filters = getFilters()
  const prevFilters = usePrevious(filters)
  const query: IElasticSearchQuery = getDefaultQuery()
  const queryObj = queryBuilder(query)
  const json = JSON.stringify(queryObj)
  const currentCollection = getCurrentCollection()
  const url = process.env.REACT_APP_SEARCH_API_HOST + currentCollection + ElasticSearchConstants.SEARCH
  const dispatch = useDispatch()
  const from = getFrom()
  const prevFrom = usePrevious(from)
  const size = getSize()
  const prevSize = usePrevious(size)
  const sortFields = getSortFields()
  const prevSortFields = usePrevious(sortFields)
  const stringInput = getStringInput()
  const prevStringInput = usePrevious(stringInput)

  const fetchResponse = (): boolean => {
    dispatch(fetchElasticSearchResponse.action({json, url}))
    return true
  }

  useEffect((): void => {
    if (!isInitialized) {
      fetchResponse()
      setIsInitialized(true)
    } else {
      if (prevStringInput !== stringInput || filters !== prevFilters || prevFrom !== from
        || prevSize !== size || prevSortFields !== sortFields) {
        fetchResponse()
      }
    }
  })

  return (
    <>
      {props.children}
    </>
  )
}

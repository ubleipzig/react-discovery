import React, {ReactElement, useEffect, useState} from "react"
import {fetchElasticSearchResponse, getStringInput} from "../state"
import {getDefaultQuery, getFrom, getSize} from "../state/selectors"
import {IElasticSearchQuery} from "../index"
import {getUrl} from "@react-discovery/configuration"
import {queryBuilder} from "../query-builders"
import {useDispatch} from 'react-redux'
import {usePrevious} from '../../hooks'
import {getFilters} from "../../solr/state/selectors"

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
  const url = getUrl()
  const dispatch = useDispatch()
  const from = getFrom()
  const prevFrom = usePrevious(from)
  const size = getSize()
  const prevSize = usePrevious(size)
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
      if (prevStringInput !== stringInput || filters !== prevFilters || prevFrom !== from || prevSize !== size) {
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

import React, {ReactElement, useEffect, useState} from "react"
import {ElasticSearchConstants} from "../enum"
import {IElasticSearchQuery} from "../index"
import {fetchElasticSearchResponse} from "../state"
import {getCurrentCollection} from "@react-discovery/configuration"
import {getDefaultQuery} from "../state/selectors"
import {queryBuilder} from "../query-builders"
import {useDispatch} from 'react-redux'
import {usePrevious} from '../../hooks'

interface IElasticSearchProvider {
  useHistory?: boolean;
}

export const ElasticSearchProvider: React.FC<IElasticSearchProvider> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const query: IElasticSearchQuery = getDefaultQuery()
  const queryObj = queryBuilder(query)
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
      fetchResponse()
      setIsInitialized(true)
    } else {
      if (prevJson !== json) {
        fetchResponse()
      }
    }
  }, [json, prevJson])

  return (
    <>
      {props.children}
    </>
  )
}

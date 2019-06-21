import React, {ReactElement, useEffect, useState} from "react"
import {fetchElasticSearchResponseWorker, getStringInput} from "../state"
import {getDefaultQuery, getUrl} from "../state/selectors"
import {IQuery} from ".."
import {queryBuilder} from "../query-builders"
import {useDispatch} from 'react-redux'
import {usePrevious} from '../hooks'

interface IElasticSearchProvider {
  useHistory?: boolean;
}

export const ElasticSearchProvider: React.FC<IElasticSearchProvider> = (props): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const query: IQuery = getDefaultQuery()
  const queryObj = queryBuilder(query)
  const json = JSON.stringify(queryObj)
  const url = getUrl()
  const dispatch = useDispatch()
  const stringInput = getStringInput()
  const prevStringInput = usePrevious(stringInput)

  const fetchResponse = (): boolean => {
    dispatch(fetchElasticSearchResponseWorker({json, url}))
    return true
  }

  useEffect((): void => {
    if (!isInitialized) {
      fetchResponse()
      setIsInitialized(true)
    } else {
      if (prevStringInput !== stringInput) {
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

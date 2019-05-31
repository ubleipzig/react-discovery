import {IQuery, queryBuilder, suggestQueryBuilder} from "."
import React, {ReactElement, useEffect, useState} from "react"
import {fetchSolrResponseWorker, fetchSolrSuggestionsWorker, setQueryFields} from "../state/actions"
import {useDispatch} from 'react-redux'
import {usePrevious} from "../hooks"

interface ISolrResponseProvider {
  query: IQuery;
}

export const SolrResponseProvider: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {query} = props
  const dispatch = useDispatch()
  const {filters, sortFields, start, stringInput, suggest} = query
  const prevStart = usePrevious(start)
  const prevStringInput = usePrevious(stringInput)
  const prevFilters = usePrevious(filters)
  const prevSortFields = usePrevious(sortFields)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (requestURI): boolean => {
    dispatch(fetchSolrResponseWorker({requestURI}))
    return true
  }

  const fetchSuggestions = (requestURI): boolean => {
    dispatch(fetchSolrSuggestionsWorker({requestURI}))
    return true
  }

  useEffect((): void => {
    const responseRequestURI = queryBuilder({...query})
    if (!isInitialized) {
      dispatch(setQueryFields({...query}))
      setIsInitialized(fetchResponse(responseRequestURI))
    }
    if (isInitialized) {
      if (prevStart !== start || prevStringInput !== stringInput
        || prevFilters !== filters || prevSortFields !== sortFields) {
        fetchResponse(responseRequestURI)
      }
    }
    if (suggest) {
      const suggestionsRequestURI = suggestQueryBuilder({...query})
      fetchSuggestions(suggestionsRequestURI)
    }
  }, [fetchResponse, isInitialized, prevStart, prevStringInput,
    setQueryFields, start, stringInput])

  return (
    <>
      {props.children}
    </>
  )
}


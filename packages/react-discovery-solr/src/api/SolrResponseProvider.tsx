import {IQuery, extendedDisMaxQueryBuilder, suggestQueryBuilder} from "."
import React, {ReactElement, useEffect, useState} from "react"
import {fetchSolrResponseWorker, fetchSolrSuggestionsWorker, setQueryFields} from "../state/actions"
import {connect} from 'react-redux'
import {usePrevious} from "../hooks"

interface ISolrResponseProvider {
  fetchSolrResponseWorker: Function;
  fetchSolrSuggestionsWorker: Function;
  query: IQuery;
  setQueryFields: typeof setQueryFields;
}

const SolrResponseProviderComponent: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {fetchSolrResponseWorker, fetchSolrSuggestionsWorker, setQueryFields, query} = props
  const {filters, sortFields, start, stringInput, suggest} = query
  const prevStart = usePrevious(start)
  const prevStringInput = usePrevious(stringInput)
  const prevFilters = usePrevious(filters)
  const prevSortFields = usePrevious(sortFields)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (requestURI): boolean => {
    fetchSolrResponseWorker({requestURI})
    return true
  }

  const fetchSuggestions = (requestURI): boolean => {
    fetchSolrSuggestionsWorker({requestURI})
    return true
  }

  useEffect((): void => {
    const responseRequestURI = extendedDisMaxQueryBuilder({...query})
    if (!isInitialized) {
      setQueryFields({...query})
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

const mapDispatchToProps = {fetchSolrResponseWorker, fetchSolrSuggestionsWorker, setQueryFields}

export const SolrResponseProvider = connect(null, mapDispatchToProps)(SolrResponseProviderComponent)

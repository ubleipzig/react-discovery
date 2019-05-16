import React, {ReactElement, useEffect, useState} from "react"
import {extendedDisMaxQueryBuilder, IQuery, suggestQueryBuilder} from "."
import {usePrevious} from "../hooks"
import {fetchSolrResponseWorker, setQueryFields} from "../state/actions"
import {connect} from 'react-redux'

interface ISolrResponseProvider {
  fetchSolrResponseWorker: Function;
  query: IQuery;
  setQueryFields: typeof setQueryFields;
}

const SolrResponseProviderComponent: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {fetchSolrResponseWorker, setQueryFields, query} = props
  const {filters, sortFields, start, stringInput, suggest} = query
  const prevStart = usePrevious(start)
  const prevStringInput = usePrevious(stringInput)
  const prevFilters = usePrevious(filters)
  const prevSortFields = usePrevious(sortFields)
  const prevSuggest = usePrevious(suggest)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (requestURI): boolean => {
    fetchSolrResponseWorker({requestURI})
    return true
  }

  useEffect((): void => {
    const requestURI = !suggest ? extendedDisMaxQueryBuilder({...query}) : suggestQueryBuilder({...query})
    if (!isInitialized) {
      setQueryFields({...query})
      setIsInitialized(fetchResponse(requestURI))
    }
    if (isInitialized) {
      if (prevStart !== start || prevStringInput !== stringInput
        || prevFilters !== filters || prevSortFields !== sortFields || prevSuggest !== suggest) {
        fetchResponse(requestURI)
      }
    }
  }, [fetchResponse, isInitialized, prevStart, prevStringInput,
    setQueryFields, start, stringInput])

  return (
    <>
      {props.children}
    </>
  )
}

const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const SolrResponseProvider = connect(null, mapDispatchToProps)(SolrResponseProviderComponent)

import React, {ReactElement, useEffect, useState} from "react"
import {extendedDisMaxQueryBuilder, IQuery} from "."
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
  const {filters, sortFields, start, stringInput} = query
  const prevStart = usePrevious(start)
  const prevStringInput = usePrevious(stringInput)
  const prevFilters = usePrevious(filters)
  const prevSortFields = usePrevious(sortFields)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (requestURI): boolean => {
    fetchSolrResponseWorker({requestURI})
    return true
  }

  useEffect((): void => {
    const requestURI = extendedDisMaxQueryBuilder({...query})
    if (!isInitialized) {
      setQueryFields({...query})
      setIsInitialized(fetchResponse(requestURI))
    }
    if (isInitialized) {
      if (prevStart !== start || prevStringInput !== stringInput
        || prevFilters !== filters || prevSortFields !== sortFields) {
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

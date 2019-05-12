import React, {ReactElement, useEffect, useState} from "react"
import {solrQuery, IQuery} from "."
import {usePrevious} from "../hooks"
import {fetchSolrResponseWorker, setQueryFields} from "../state/actions"
import {connect} from 'react-redux'

interface ISolrResponseProvider {
  fetchSolrResponseWorker: any;
  query: IQuery;
  setQueryFields: typeof setQueryFields;
}

const SolrResponseProviderComponent: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {fetchSolrResponseWorker, setQueryFields, query} = props
  const {searchFields, sortFields, url, start, rows, typeDef, stringInput} = query
  const prevStart = usePrevious(start)
  const prevStringInput = usePrevious(stringInput)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (query): boolean => {
    const queryString = solrQuery(query)
    const requestUrl = `${query.url}?${queryString}`
    fetchSolrResponseWorker({requestUrl})
    return true
  }

  useEffect((): void => {
    const query = {searchFields, sortFields, url, start, rows, typeDef, stringInput}
    if (!isInitialized) {
      setQueryFields({...query})
      setIsInitialized(fetchResponse(query))
    }
    if (isInitialized && prevStart !== start) {
      fetchResponse(query)
    }
    if (isInitialized && prevStringInput !== stringInput) {
      fetchResponse(query)
    }
  }, [fetchResponse, isInitialized, prevStart, prevStringInput, rows, searchFields,
    setQueryFields, sortFields, start, stringInput, url])

  return (
    <>
      {props.children}
    </>
  )
}

const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const SolrResponseProvider = connect(null, mapDispatchToProps)(SolrResponseProviderComponent)

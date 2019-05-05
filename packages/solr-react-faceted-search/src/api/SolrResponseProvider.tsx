import React, {ReactElement, useEffect, useState} from "react"
import {solrQuery, IQuery} from "."
import {usePrevious} from "../hooks"
import {fetchSolrResponseWorker, setQueryFields} from "../state/actions"
import {connect} from 'react-redux'

interface ISolrResponseProvider {
  fetchSolrResponseWorker: any
  query: IQuery
  setQueryFields: typeof setQueryFields
}

const SolrResponseProviderComponent: React.FC<ISolrResponseProvider> = (props): ReactElement => {
  const {fetchSolrResponseWorker, setQueryFields, query} = props
  const {searchFields, sortFields, url, start, rows} = query
  const prevStart = usePrevious(start)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const fetchResponse = (query) => {
      const queryString = solrQuery(query);
      const requestUrl = `${query.url}?${queryString}`
      fetchSolrResponseWorker({requestUrl})
      return true
    }
    const query = {searchFields, sortFields, url, start, rows}
    if (!isInitialized) {
      setQueryFields({...query})
      setIsInitialized(fetchResponse(query))
    }
    if (isInitialized && prevStart !== start) {
      setQueryFields({...query})
      fetchResponse(query)
    }
  }, [fetchSolrResponseWorker, isInitialized, prevStart, rows, searchFields, setQueryFields, sortFields, start, url])

  return (
    <>
      {props.children}
    </>
  )
}

const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const SolrResponseProvider = connect(null, mapDispatchToProps)(SolrResponseProviderComponent)

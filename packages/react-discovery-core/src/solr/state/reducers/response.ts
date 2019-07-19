import {IAggregations, IHit, IHits, IResponse} from '../../..'
import {IGrouped} from "../../"
import {fetchSolrResponse} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

const initialState: IResponse = {
  aggregations: null,
  hits: null,
  url: null,
}

const buildAggregations = (fields): IAggregations => {
  return Object.entries(fields).reduce((object, [k, v]): IAggregations => {
    const buckets = []
    const keys = (v as []).filter(({}, i): boolean => i % 2 === 0)
    const values = (v as []).filter(({}, i): boolean => i % 2 === 1)
    keys.map((k, i): void => {
      buckets.push({doc_count: values[i], key: k}) // eslint-disable-line
    })
    return {
      ...object,
      [k]: {buckets}
    }
  }, {})
}

const buildDocs = (result): IHit[] => {
  return result.response.docs.map((doc): IHit => {
    return {
      _source: doc,
      highlighting: result.highlighting && result.highlighting[doc.id]
    }
  })
}

const buildGroups = (grouped: IGrouped): IHit[] => {
  const [groups] = Object.values(grouped)
  const docs = groups.groups.map((dl): any => dl.doclist.docs)
  return docs && docs.map((doc): any => {
    const [_source] = doc
    return {
      _source,
      highlighting: {}
    }
  })
}

const buildGroupedMatches = (grouped: IGrouped): number => {
  const [groups] = Object.values(grouped)
  return groups.matches
}

const buildHits = (result): IHits => {
  return {
    hits: result.grouped ? buildGroups(result.grouped) : result.response && result.response.docs ? buildDocs(result) : [],
    numFound: result.grouped ? buildGroupedMatches(result.grouped) : result.response ? result.response.numFound : null,
  }
}

export const response = reducerWithInitialState(initialState)
  .case(fetchSolrResponse.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchSolrResponse.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    aggregations: result.facet_counts ? buildAggregations(result.facet_counts.facet_fields) : state.aggregations,
    hits: buildHits(result),
    updating: false,
    url: params.url,
  }))
  .case(fetchSolrResponse.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))

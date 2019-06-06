import {IAggregations, IHit, IHits, IResponse} from "../.."
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
      buckets.push({docCount: values[i], key: k})
    })
    return {
      ...object,
      [k]: {buckets}
    }
  }, {})
}

const buildDocs = (result): IHit[] => {
  return result.response && result.response.docs && result.response.docs.map((doc): IHit => {
    return {
      _source: doc,
      highlighting: result.highlighting && result.highlighting[doc.id]
    }
  })
}
const buildHits = (result): IHits => {
  return {
    hits: buildDocs(result),
    numFound: result.response ? result.response.numFound : null,
  }
}

export const response = reducerWithInitialState(initialState)
  .case(fetchSolrResponse.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchSolrResponse.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    aggregations: result.facet_counts ? buildAggregations(result.facet_counts.facet_fields) : state.aggregations,
    grouped: result.grouped || {},
    hits: result.response ? buildHits(result) : state.hits,
    updating: false,
    url: params.url,
  }))
  .case(fetchSolrResponse.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))

import {IAggregations, IHit, IHits, IResponse} from "../../.."
import {fetchElasticSearchResponse} from '../actions'
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
  return result.hits.hits.map((hit): IHit => {
    return {
      _source: hit._source,
      highlighting: hit.highlight || {},
      id: hit._id,
    }
  })
}

const buildHits = (result): IHits => {
  return {
    hits: result.hits && result.hits.hits ? buildDocs(result) : [],
    numFound: result.hits ? result.hits.total.value : null,
  }
}

export const response = reducerWithInitialState(initialState)
  .case(fetchElasticSearchResponse.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchElasticSearchResponse.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    aggregations: result.facet_counts ? buildAggregations(result.facet_counts.facet_fields) : state.aggregations,
    hits: buildHits(result),
    updating: false,
    url: params.url,
  }))
  .case(fetchElasticSearchResponse.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))

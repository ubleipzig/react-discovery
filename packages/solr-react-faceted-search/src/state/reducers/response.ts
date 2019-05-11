import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {fetchSolrResponse} from '../actions'
const uuidv5 = require('uuidv5')

interface IState {
  aggregations: IAggregations
  hits: IHits
  url: string
}

export interface IAggregations {
  [field: string]: {
    buckets: []
  }
}
export interface IHits {
  hits: []
  numFound: number
}

const initialState: IState = {
  aggregations: null,
  hits: null,
  url: null,
}

const tryGroupedResultCount = (data) => {
  if (data.grouped) {
    for (let key in data.grouped) {
      if (data.grouped[key].matches) {
        return data.grouped[key].matches;
      }
    }
  }
  return 0;
};

const buildAggregations = (fields): IAggregations => {
  return Object.entries(fields).reduce((object, [k, v]) => {
    const buckets = []
    const keys = (v as []).filter(({}, i) => i % 2 === 0)
    const values = (v as []).filter(({}, i) => i % 2 === 1)
    keys.map((k, i) => {
      buckets.push({key: k, docCount: values[i]})
    })
    return {
      ...object,
      [k]: {buckets}
    }
  }, {})
}

const buildHits = (result): IHits => {
  return {
    hits: result.response ? result.response.docs : [],
    numFound: result.response ? result.response.numFound : tryGroupedResultCount(result),
  }
}

export const response = reducerWithInitialState(initialState)
  .case(fetchSolrResponse.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchSolrResponse.done, (state: IState, action: any) => ({
    ...state,
    url: action.payload.params.url,
    hits: buildHits(action.payload.result),
    grouped: action.payload.result.grouped || {},
    aggregations: buildAggregations(action.payload.result.facet_counts.facet_fields),
    highlighting: action.payload.result.highlighting ? action.data.highlighting : [],
    updating: false,
  }))
  .case(fetchSolrResponse.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))

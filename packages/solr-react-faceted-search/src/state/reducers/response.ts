import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {fetchSolrResponse} from '../actions'

interface IResponseState {
  aggregations: IAggregations;
  hits: IHits;
}

export interface IAggregations {
  [field: string]: {
    buckets: [];
  };
}
export interface IHits {
  hits: IHit[];
  numFound: number;
}

export interface IHit {
  _source: any;
  highlighting: any;
}

const initialState: IResponseState = {
  aggregations: null,
  hits: null,
}

const buildAggregations = (fields): IAggregations => {
  return Object.entries(fields).reduce((object, [k, v]): any => {
    const buckets = []
    const keys = (v as []).filter(({}, i): any => i % 2 === 0)
    const values = (v as []).filter(({}, i): any => i % 2 === 1)
    keys.map((k, i): any => {
      buckets.push({key: k, docCount: values[i]})
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
  .case(fetchSolrResponse.started, (state): any => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchSolrResponse.done, (state: IResponseState, action: any): any => ({
    ...state,
    url: action.payload.params.url,
    hits: action.payload.result.response ? buildHits(action.payload.result) : state.hits,
    grouped: action.payload.result.grouped || {},
    aggregations: action.payload.result.facet_counts ? buildAggregations(action.payload.result.facet_counts.facet_fields) : state.aggregations,
    updating: false,
  }))
  .case(fetchSolrResponse.failed, (state, { error }): any => ({
    ...state,
    error,
    updating: false,
  }))

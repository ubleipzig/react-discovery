import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {fetchSolrResponse} from '../actions'

interface IState {
  aggregations: IAggregations;
  hits: IHits;
  url: string;
}

export interface IAggregations {
  [field: string]: {
    buckets: [];
  };
}
export interface IHits {
  hits: [];
  numFound: number;
}

const initialState: IState = {
  aggregations: null,
  hits: null,
  url: null,
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

const buildDocs = (result) => {
  return result.response && result.response.docs && result.response.docs.map((doc) => {
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
  .caseWithAction(fetchSolrResponse.done, (state: IState, action: any): any => ({
    ...state,
    url: action.payload.params.url,
    hits: buildHits(action.payload.result),
    grouped: action.payload.result.grouped || {},
    aggregations: buildAggregations(action.payload.result.facet_counts.facet_fields),
    highlighting: action.payload.result.highlighting ? action.payload.result.highlighting : [],
    updating: false,
  }))
  .case(fetchSolrResponse.failed, (state, { error }): any => ({
    ...state,
    error,
    updating: false,
  }))

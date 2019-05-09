import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {fetchSolrResponse} from '../actions'
const uuidv5 = require('uuidv5')

const initialState = {}

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

const buildBuckets = (fields) => {
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

export const response = reducerWithInitialState(initialState)
  .case(fetchSolrResponse.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchSolrResponse.done, (state, action: any) => ({
    ...state,
    url: action.payload.params.url,
    json: action.payload.result,
    docs: action.payload.result.response ? action.payload.result.response.docs : [],
    grouped: action.payload.result.grouped || {},
    numFound: action.payload.result.response ?
      action.payload.result.response.numFound : tryGroupedResultCount(action.payload.result),
    facets: buildBuckets(action.payload.result.facet_counts.facet_fields),
    highlighting: action.payload.result.highlighting ? action.data.highlighting : [],
    updating: false,
  }))
  .case(fetchSolrResponse.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))

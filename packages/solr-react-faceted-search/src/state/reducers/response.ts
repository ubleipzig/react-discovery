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
    facets: action.payload.result.facet_counts.facet_fields,
    highlighting: action.payload.result.highlighting ? action.data.highlighting : [],
    updating: false,
  }))
  .case(fetchSolrResponse.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))

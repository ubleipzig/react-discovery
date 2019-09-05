import {IHit, IResponse} from "../../.."
import {fetchElasticSearchDocument, fetchElasticSearchResponse} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

const initialState: IResponse = {
  aggregations: null,
  docs: {},
  hits: {
    hits: [],
    numFound: 0,
  },
  url: null,
}

const buildInnerHitHighlight = (highlight) => {
  const ihHighlight = Object.entries(highlight).map(([k, v]) => {
    const field = k.split('.').pop()
    return {
      [field]: v[0]
    }
  })
  return ihHighlight[0]
}

const buildInnerHits = (hit): IHit[] => {
  const ih = Object.keys(hit.inner_hits).map((key): any => {
    return hit.inner_hits[key].hits.hits.map((hit) => {
      return {
        _source: hit._source,
        field: key,
        highlighting: buildInnerHitHighlight(hit.highlight),
        id: hit._id,
      }
    })
  })
  return [].concat(...ih)
}

const buildDocs = (result): IHit[] => {
  return result.hits.hits.map((hit): IHit => {
    return {
      _source: hit._source,
      highlighting: hit.highlight || {},
      id: hit._id,
      innerHits: hit.inner_hits ? buildInnerHits(hit) : [],
    }
  })
}

const buildHits = (result): IHit[] => {
  return result.hits && result.hits.hits ? buildDocs(result) : []
}

const buildNumFound = (result) => {
  return result.hits ? result.hits.total.value : null
}

const buildDocIdFromResult = (result) => {
  return result && result._id
}

export const response = reducerWithInitialState(initialState)
  .case(fetchElasticSearchResponse.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchElasticSearchResponse.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    aggregations: result.aggregations ? result.aggregations : state.aggregations,
    hits: {
      hits: [...buildHits(result)],
      numFound: buildNumFound(result)
    },
    updating: false,
    url: params.url,
  }))
  .case(fetchElasticSearchResponse.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))
  .case(fetchElasticSearchDocument.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchElasticSearchDocument.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    docs: {
      ...state.docs,
      [buildDocIdFromResult(result)]: result
    },
    updating: false,
    url: params.url,
  }))
  .case(fetchElasticSearchDocument.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))

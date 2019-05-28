import {SolrParameters} from "./SolrParameters"
const queryString = require('query-string')

interface ISuggestQuery {
  stringInput: string;
  suggest?: boolean;
  suggestDictionary?: string;
  url: string;
}

const buildSuggestParams = (suggestDictionary, suggest = true): any => {
  return {
    [SolrParameters.SUGGEST_BUILD]: suggest,
    [SolrParameters.SUGGEST_DICTIONARY]: suggestDictionary
  }
}

const buildQueryString = (stringInput): any => {
  return stringInput ? {
    [SolrParameters.SUGGEST_QUERY]: stringInput}
    : {[SolrParameters.SUGGEST_QUERY]: ''}
}

export const suggestQueryBuilder = (props: ISuggestQuery): string => {
  const {stringInput, suggest, suggestDictionary, url} = props
  const qs = {
    ...buildSuggestParams(suggestDictionary, suggest),
    ...buildQueryString(stringInput)
  }
  return `${url}${SolrParameters.SUGGEST_CONTEXT}?${queryString.stringify(qs)}`
}

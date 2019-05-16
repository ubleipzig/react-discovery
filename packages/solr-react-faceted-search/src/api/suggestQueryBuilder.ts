import {SolrParameters} from "./SolrParameters"

interface ISuggestQuery {
  stringInput: string;
  suggest?: boolean;
  suggestDictionary?: string;
  url: string;
}

const buildQueryString = (stringInput, suggest, suggestDictionary) => {
  const sq = stringInput ? `${SolrParameters.SUGGEST_QUERY}=${stringInput}` : `${SolrParameters.SUGGEST_QUERY}=A`
  const queryString = `${sq}
  &${SolrParameters.SUGGEST}=${suggest}
  &${SolrParameters.SUGGEST_BUILD}=${true}
  &${SolrParameters.SUGGEST_DICTIONARY}=${suggestDictionary}`
  return queryString
}
export const suggestQueryBuilder = (props: ISuggestQuery): string => {
  const {stringInput, suggest, suggestDictionary, url} = props
  const qs = buildQueryString(stringInput, suggest, suggestDictionary)
  return `${url}${SolrParameters.SUGGEST_CONTEXT}?${qs}`
}

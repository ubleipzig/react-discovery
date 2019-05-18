import {SolrParameters} from "./SolrParameters"

interface ISuggestQuery {
  stringInput: string;
  suggest?: boolean;
  suggestDictionary?: string;
  url: string;
}

const buildQueryString = (stringInput, suggest, suggestDictionary): string => {
  const sq = stringInput ? `${SolrParameters.SUGGEST_QUERY}=${encodeURIComponent(stringInput)}`
    : `${SolrParameters.SUGGEST_QUERY}=''`
  return `${sq}&${SolrParameters.SUGGEST}=${suggest}&${SolrParameters.SUGGEST_BUILD}=${true}&${SolrParameters.SUGGEST_DICTIONARY}=${suggestDictionary}`
}
export const suggestQueryBuilder = (props: ISuggestQuery): string => {
  const {stringInput, suggest, suggestDictionary, url} = props
  const qs = buildQueryString(stringInput, suggest, suggestDictionary)
  return `${url}${SolrParameters.SUGGEST_CONTEXT}?${qs}`
}

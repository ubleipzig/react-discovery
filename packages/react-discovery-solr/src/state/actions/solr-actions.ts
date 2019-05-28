import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';
import {ISortField, ISearchField} from '../../api'

const FETCH_SOLR_RESPONSE = 'FETCH_SOLR_RESPONSE'
const FETCH_SOLR_SUGGESTIONS = 'FETCH_SOLR_SUGGESTIONS'
const SET_QUERY_FIELDS = "SET_QUERY_FIELDS"
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const SET_SEARCH_FIELDS = "SET_SEARCH_FIELDS"
const SET_SELECTED_FILTERS = "SET_SELECTED_FILTERS"
const SET_SORT_FIELDS = "SET_SORT_FIELDS"
const SET_START = "SET_START"
const SET_SUGGEST = "SET_SUGGEST"
const SET_DISMAX = "SET_DISMAX"
const actionCreator = actionCreatorFactory()

export const setQueryFields = actionCreator<{searchFields: ISearchField[]; sortFields: ISortField[];
  url: string; start: number; size: number;}>(SET_QUERY_FIELDS)
export const setStart = actionCreator<{newStart: number}>(SET_START)
export const setDisMaxQuery = actionCreator<{typeDef: string; stringInput: string}>(SET_DISMAX)
export const setSearchFields = actionCreator<{searchFields}>(SET_SEARCH_FIELDS)
export const setSortFields = actionCreator<{sortFields}>(SET_SORT_FIELDS)
export const setSelectedFilters = actionCreator<{field: string; filters: string[]}>(SET_SELECTED_FILTERS)
export const setSuggest = actionCreator<{suggest: boolean; stringInput?: string}>(SET_SUGGEST)
export const setResponseError = actionCreator<{error: string}>(SET_RESPONSE_ERROR)
interface IFetchSolrResponseParams { requestURI: string}
type Succ = any;

export const fetchSolrResponse: any = actionCreator.async<IFetchSolrResponseParams, Succ>(FETCH_SOLR_RESPONSE)

export const fetchSolrResponseWorker = bindThunkAction(fetchSolrResponse,
  async (params: IFetchSolrResponseParams): Promise<string> => {
    try {
      const res = await fetch(params.requestURI)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
)

export const fetchSolrSuggestions: any = actionCreator.async<IFetchSolrResponseParams, Succ>(FETCH_SOLR_SUGGESTIONS)

export const fetchSolrSuggestionsWorker = bindThunkAction(fetchSolrSuggestions,
  async (params: IFetchSolrResponseParams): Promise<string> => {
    try {
      const res = await fetch(params.requestURI)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
)

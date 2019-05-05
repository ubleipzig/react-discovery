import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';
import {ISortField, ISearchField} from '../../api'

const FETCH_SOLR_RESPONSE = 'FETCH_SOLR_RESPONSE'
const SET_QUERY_FIELDS = "SET_QUERY_FIELDS"
const SET_START = "SET_START"
const actionCreator = actionCreatorFactory();

export const setQueryFields = actionCreator<{searchFields: ISearchField[], sortFields: ISortField[],
  url: string, start: number, rows: number}>(SET_QUERY_FIELDS)
export const setStart = actionCreator<{newStart}>(SET_START)

interface IFetchSolrResponseParams { requestUrl: string; }
type Succ = any;

export const fetchSolrResponse: any = actionCreator.async<IFetchSolrResponseParams, Succ>(FETCH_SOLR_RESPONSE);

export const fetchSolrResponseWorker = bindThunkAction(fetchSolrResponse,
  async (params: IFetchSolrResponseParams) => {
    const res = await fetch(params.requestUrl);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json()
  }
);

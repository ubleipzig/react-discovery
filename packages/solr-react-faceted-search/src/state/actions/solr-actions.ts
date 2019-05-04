import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';

const SET_QUERY_STATE = "SET_QUERY_STATE"
const SET_RESULTS_STATE = "SET_RESULTS_STATE"
const SET_SOLR_STATE = "SET_SOLR_STATE"
const SET_QUERY_FIELDS = "SET_QUERY_FIELDS"
const actionCreator = actionCreatorFactory();

export const setQueryFields = actionCreator<{query, start}>(SET_QUERY_FIELDS)
export const setQueryState = actionCreator<{query}>(SET_QUERY_STATE)
export const setSolrState = actionCreator<{state}>(SET_SOLR_STATE)
export const setResultsState = actionCreator<{results}>(SET_RESULTS_STATE)

interface IFetchSolrResponseParams { url: string; }
type Succ = any;

export const fetchSolrResponse: any = actionCreator.async<IFetchSolrResponseParams, Succ>('FETCH_SOLR_RESPONSE');

export const fetchSolrResponseWorker = bindThunkAction(fetchSolrResponse,
  async (params: IFetchSolrResponseParams) => {
    const res = await fetch(params.url);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json()
  }
);

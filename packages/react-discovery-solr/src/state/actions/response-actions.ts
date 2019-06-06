import {IFetchSolrResponseParams, Succ} from '../..'
import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';

const FETCH_SOLR_RESPONSE = 'FETCH_SOLR_RESPONSE'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const actionCreator = actionCreatorFactory()

export const setResponseError = actionCreator<{error: string}>(SET_RESPONSE_ERROR)

export const fetchSolrResponse = actionCreator.async<IFetchSolrResponseParams, Succ>(FETCH_SOLR_RESPONSE)

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



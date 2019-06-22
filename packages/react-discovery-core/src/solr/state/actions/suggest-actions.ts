import {IFetchSolrResponseParams, Succ} from '../../index'
import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';
import {setResponseError} from "./response-actions"

const FETCH_SOLR_SUGGESTIONS = 'FETCH_SOLR_SUGGESTIONS'
const actionCreator = actionCreatorFactory()
export const fetchSolrSuggestions = actionCreator.async<IFetchSolrResponseParams, Succ>(FETCH_SOLR_SUGGESTIONS)

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

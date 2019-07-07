import {IFetchSolrResponseParams, IState, Succ} from '../../index'
import actionCreatorFactory from 'typescript-fsa'
import {asyncFactory} from 'typescript-fsa-redux-thunk'
import {setResponseError} from "./response-actions"

const FETCH_SOLR_SUGGESTIONS = 'FETCH_SOLR_SUGGESTIONS'
const create = actionCreatorFactory()
const createAsync = asyncFactory<IState>(create)

export const fetchSolrSuggestions = createAsync<IFetchSolrResponseParams, Succ>(FETCH_SOLR_SUGGESTIONS,
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

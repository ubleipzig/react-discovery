import {IFetchSolrResponseParams, IState, Succ} from '../../index'
import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory} from 'typescript-fsa-redux-thunk';

const FETCH_SOLR_RESPONSE = 'FETCH_SOLR_RESPONSE'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const create = actionCreatorFactory()
const createAsync = asyncFactory<IState>(create)
export const setResponseError = create<{error: string}>(SET_RESPONSE_ERROR)

export const fetchSolrResponse = createAsync<IFetchSolrResponseParams, Succ>(FETCH_SOLR_RESPONSE,
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



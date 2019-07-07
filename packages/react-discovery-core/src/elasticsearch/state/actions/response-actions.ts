import {IState, Succ} from '../../..'
import {IFetchElasticSearchResponseParams} from '../../index'
import actionCreatorFactory from 'typescript-fsa'
import {asyncFactory} from 'typescript-fsa-redux-thunk'
const create = actionCreatorFactory()
const FETCH_ELASTICSEARCH_RESPONSE = 'FETCH_ELASTICSEARCH_RESPONSE'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const createAsync = asyncFactory<IState>(create)
export const setResponseError = create<{error: string}>(SET_RESPONSE_ERROR)

export const fetchElasticSearchResponse = createAsync<IFetchElasticSearchResponseParams, Succ>(FETCH_ELASTICSEARCH_RESPONSE,
  async (params: IFetchElasticSearchResponseParams): Promise<string> => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json')
      const cache: RequestCache = 'default'
      const mode: RequestMode = 'cors'
      const init = {
        body: params.json,
        cache,
        headers,
        method: 'POST',
        mode,
      }
      const request = new Request(params.url, init)
      const res = await fetch(request)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
)

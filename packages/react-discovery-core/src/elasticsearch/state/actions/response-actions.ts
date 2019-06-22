import {IFetchElasticSearchResponseParams} from '../../index'
import {Succ} from '../../..'
import actionCreatorFactory from 'typescript-fsa'
import {bindThunkAction} from 'typescript-fsa-redux-thunk'

const FETCH_ELASTICSEARCH_RESPONSE = 'FETCH_ELASTICSEARCH_RESPONSE'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const actionCreator = actionCreatorFactory()

export const setResponseError = actionCreator<{error: string}>(SET_RESPONSE_ERROR)

export const fetchElasticSearchResponse = actionCreator.async<IFetchElasticSearchResponseParams, Succ>(FETCH_ELASTICSEARCH_RESPONSE)

export const fetchElasticSearchResponseWorker = bindThunkAction(fetchElasticSearchResponse,
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

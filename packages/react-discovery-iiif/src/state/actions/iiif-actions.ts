import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory} from 'typescript-fsa-redux-thunk';
const actionCreator = actionCreatorFactory()

const createAsync = asyncFactory<IState>(actionCreator)
const SET_CURRENT_MANIFEST_COLLECTION = "SET_CURRENT_MANIFEST_COlLECTION"
const FETCH_IMAGE_SERVICES = 'FETCH_IMAGE_SERVICES'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const SET_IN_APOLLO_REQUEST = "SET_IN_APOLLO_REQUEST"

export const setCurrentManifestCollection = actionCreator<{collection: any}>(SET_CURRENT_MANIFEST_COLLECTION)
export const setInApolloRequest = actionCreator<{uuid: string}>(SET_IN_APOLLO_REQUEST)
export const setResponseError = actionCreator<{error: string}>(SET_RESPONSE_ERROR)

interface IImageServices {
  url: string;
  json: string;
  manifestId: string;
}

export interface IState {
  error?: Error;
}

export const fetchImageServices = createAsync<IImageServices, any>(FETCH_IMAGE_SERVICES,
  async (params: IImageServices): Promise<string> => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Origin', params.url)
      headers.append('Connection', 'keep-alive')
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
      setResponseError({error: e})
    }
  }
)

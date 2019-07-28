import {IIIIF, IResponse} from "../.."
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  fetchImageServices,
  setCurrentManifestCollection,
  setInApolloRequest
} from "../actions"
import uuidv5 from 'uuidv5'

export const iiif = (initialState): ReducerBuilder<IIIIF> => reducerWithInitialState(initialState)
  .case(setCurrentManifestCollection, (state, {collection}): ReducerBuilder<IIIIF> => ({
    ...state,
    collection
  }))
  .case(setInApolloRequest, (state, {uuid}): ReducerBuilder<IIIIF> => ({
    ...state,
    apollo: [uuid, ...state.apollo]
  }))
  .case(fetchImageServices.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchImageServices.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))
  .case(fetchImageServices.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    responses: {
      ...state.responses,
      [uuidv5('url', params.manifestId)]: {
        imageServices: result.data && result.data.imageServices
      }
    },
    updating: false,
  }))

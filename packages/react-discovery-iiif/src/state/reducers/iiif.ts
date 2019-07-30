import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setCurrentManifestCollection, setInApolloRequest} from "../actions"
import {IIIIF} from "../.."

export const iiif = (initialState): ReducerBuilder<IIIIF> => reducerWithInitialState(initialState)
  .case(setCurrentManifestCollection, (state, {collection}): ReducerBuilder<IIIIF> => ({
    ...state,
    collection
  }))
  .case(setInApolloRequest, (state, {uuid}): ReducerBuilder<IIIIF> => ({
    ...state,
    apollo: [uuid, ...state.apollo]
  }))

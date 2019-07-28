import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  fetchImageServices,
  setCurrentLanguage,
  setCurrentManifestCollection,
  setHitComponent,
  setInApolloRequest,
  setIsItemExpanded,
  setIsPersisted,
  setIsViewExpanded,
  setSelectedIndex
} from "../actions"
import {IConfig, IResponse} from "../.."
import uuidv5 from 'uuidv5'

export const config = (initialState): ReducerBuilder<IConfig> => reducerWithInitialState(initialState)
  .case(setSelectedIndex, (state, {selectedIndex}): ReducerBuilder<IConfig> => ({
    ...state,
    selectedIndex
  }))
  .case(setIsPersisted, (state, {isPersisted}): ReducerBuilder<IConfig> => ({
    ...state,
    isPersisted
  }))
  .case(setHitComponent, (state, {currentHitComponent}): ReducerBuilder<IConfig> => ({
    ...state,
    currentHitComponent
  }))
  .case(setIsViewExpanded, (state, {isViewExpanded}): ReducerBuilder<IConfig> => ({
    ...state,
    isViewExpanded
  }))
  .case(setIsItemExpanded, (state, {id, isItemExpanded}): ReducerBuilder<IConfig> => ({
    ...state,
    expandedItems: {
      ...state.expandedItems,
      [id]: isItemExpanded,
    }
  }))
  .case(setCurrentLanguage, (state, {currentLanguage}): ReducerBuilder<IConfig> => ({
    ...state,
    currentLanguage
  }))
  .case(setCurrentManifestCollection, (state, {collection}): ReducerBuilder<IConfig> => ({
    ...state,
    collection
  }))
  .case(setInApolloRequest, (state, {uuid}): ReducerBuilder<IConfig> => ({
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

import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {removeViewId, setViewIdMap, setWorkspaceLayout, setWorkspaceState} from "../actions"
import {MosaicParent} from 'react-mosaic-component'
import {omit} from 'lodash'
import uuid from 'uuid'
interface IWorkspace {
  layout: MosaicParent<string>;
  viewIdMap: Record<string, string>;
}

export const workspace = (initialState): ReducerBuilder<IWorkspace> => reducerWithInitialState(initialState)
  .case(setWorkspaceLayout, (state, {layout}): ReducerBuilder<IWorkspace> => ({
    ...state,
    layout
  }))
  .case(setViewIdMap, (state, {collection, id, manifest, type}): ReducerBuilder<IWorkspace> => ({
    ...state,
    viewIdMap: {
      ...state.viewIdMap,
      [uuid()]: {
        collection,
        id,
        manifest,
        type
      }
    }
  }))
  .case(removeViewId, (state, {id}): ReducerBuilder<IWorkspace> => ({
    ...state,
    viewIdMap: omit(state.viewIdMap, id)
  }))
  .case(setWorkspaceState, (state, {workspace}): ReducerBuilder<IWorkspace> => ({
    ...state,
    ...workspace,
  }))

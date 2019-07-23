import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {MosaicParent} from 'react-mosaic-component'
import {setWorkspaceLayout} from "../actions"

interface IWorkspace {
  layout: MosaicParent<string>;
  viewIdMap: Record<string, string>;
}

export const workspace = (initialState): ReducerBuilder<IWorkspace> => reducerWithInitialState(initialState)
  .case(setWorkspaceLayout, (state, {layout}): ReducerBuilder<IWorkspace> => ({
    ...state,
    layout
  }))

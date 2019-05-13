import { Action } from "typescript-fsa";
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setSelectedIndex} from "../actions"

const initialState: any = {
  currentPage: 0
};

export const config = reducerWithInitialState(initialState)
  .caseWithAction(setSelectedIndex, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    selectedIndex: action.payload.selectedIndex
  }))

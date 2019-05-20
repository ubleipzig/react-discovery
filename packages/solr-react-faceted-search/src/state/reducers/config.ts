import { Action } from "typescript-fsa";
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setIsPersisted, setSelectedIndex} from "../actions"

const initialState: any = {
  isPersisted: false,
  selectedIndex: 0
};

export const config = reducerWithInitialState(initialState)
  .caseWithAction(setSelectedIndex, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    selectedIndex: action.payload.selectedIndex
  }))
  .caseWithAction(setIsPersisted, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    isPersisted: action.payload.isPersisted
  }))

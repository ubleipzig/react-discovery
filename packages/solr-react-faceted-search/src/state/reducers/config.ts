import { Action } from "typescript-fsa";
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setIsPersisted, setSelectedIndex, setHitComponent, setIsViewExpanded} from "../actions"

export const config = (initialState): any => reducerWithInitialState(initialState)
  .caseWithAction(setSelectedIndex, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    selectedIndex: action.payload.selectedIndex
  }))
  .caseWithAction(setIsPersisted, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    isPersisted: action.payload.isPersisted
  }))
  .caseWithAction(setHitComponent, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    currentHitComponent: action.payload.currentHitComponent
  }))
  .caseWithAction(setIsViewExpanded, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    isViewExpanded: action.payload.isViewExpanded
  }))

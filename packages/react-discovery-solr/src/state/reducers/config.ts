import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setCurrentLanguage, setHitComponent, setIsPersisted, setIsViewExpanded, setSelectedIndex} from "../actions"
import { Action } from "typescript-fsa";

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
  .caseWithAction(setCurrentLanguage, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    currentLanguage: action.payload.currentLanguage
  }))

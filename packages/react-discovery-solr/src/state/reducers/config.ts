import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setCurrentLanguage, setHitComponent, setIsPersisted, setIsViewExpanded, setSelectedIndex} from "../actions"

export const config = (initialState): any => reducerWithInitialState(initialState)
  .case(setSelectedIndex, (state, {selectedIndex}): ReducerBuilder<any> => ({
    ...state,
    selectedIndex
  }))
  .case(setIsPersisted, (state, {isPersisted}): ReducerBuilder<any> => ({
    ...state,
    isPersisted
  }))
  .case(setHitComponent, (state, {currentHitComponent}): ReducerBuilder<any> => ({
    ...state,
    currentHitComponent
  }))
  .case(setIsViewExpanded, (state, {isViewExpanded}): ReducerBuilder<any> => ({
    ...state,
    isViewExpanded
  }))
  .case(setCurrentLanguage, (state, {currentLanguage}): ReducerBuilder<any> => ({
    ...state,
    currentLanguage
  }))

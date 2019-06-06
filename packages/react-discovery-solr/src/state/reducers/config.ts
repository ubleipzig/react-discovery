import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setCurrentLanguage, setHitComponent, setIsPersisted, setIsViewExpanded, setSelectedIndex} from "../actions"
import {IConfig} from "../../index"

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
  .case(setCurrentLanguage, (state, {currentLanguage}): ReducerBuilder<IConfig> => ({
    ...state,
    currentLanguage
  }))

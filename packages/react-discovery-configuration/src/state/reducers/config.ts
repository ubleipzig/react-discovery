import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  setCurrentCollection,
  setCurrentLanguage,
  setCurrentSelectedTab,
  setHitComponent,
  setIsPersisted,
  setIsViewExpanded,
  setItemViewType,
  setSelectedIndex
} from "../actions"
import {IConfig} from "../.."

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
  .case(setItemViewType, (state, {id, itemViewType}): ReducerBuilder<IConfig> => ({
    ...state,
    itemViews: {
      ...state.itemViews,
      [id]: itemViewType,
    }
  }))
  .case(setCurrentLanguage, (state, {currentLanguage}): ReducerBuilder<IConfig> => ({
    ...state,
    currentLanguage
  }))
  .case(setCurrentCollection, (state, {currentCollection}): ReducerBuilder<IConfig> => ({
    ...state,
    currentCollection
  }))
  .case(setCurrentSelectedTab, (state, {currentSelectedTab, id}): ReducerBuilder<IConfig> => ({
    ...state,
    selectedTabs: {
      ...state.selectedTabs,
      [id]: currentSelectedTab,
    }
  }))

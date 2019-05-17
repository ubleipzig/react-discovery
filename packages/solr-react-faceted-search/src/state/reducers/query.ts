import { Action } from "typescript-fsa";
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  setDisMaxQuery,
  setQueryFields,
  setSearchFields,
  setSelectedFilters,
  setSortFields,
  setStart,
  setSuggest
} from "../actions"

export const query = (initialState): any => reducerWithInitialState(initialState)
  .caseWithAction(setQueryFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    group: action.payload.group,
    highlighting: action.payload.highlighting,
    searchFields: action.payload.searchFields,
    sortFields: action.payload.sortFields,
    size: action.payload.size,
    start: action.payload.start,
    suggestDictionary: action.payload.suggestDictionary
  }))
  .caseWithAction(setDisMaxQuery, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    stringInput: action.payload.stringInput,
    typeDef: action.payload.typeDef,
  }))
  .caseWithAction(setSearchFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    searchFields: action.payload.searchFields,
  }))
  .caseWithAction(setSortFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    sortFields: action.payload.sortFields,
  }))
  .caseWithAction(setStart, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    start: action.payload.newStart
  }))
  .caseWithAction(setSuggest, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    stringInput: action.payload.stringInput,
    suggest: action.payload.suggest
  }))
  .caseWithAction(setSelectedFilters, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    filters: {
      ...state.filters,
      [action.payload.field]: action.payload.filters
    }
  }))

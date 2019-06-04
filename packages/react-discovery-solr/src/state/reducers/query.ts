import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  setQueryFields,
  setQueryInput,
  setSearchFields,
  setSelectedFilters,
  setSortFields,
  setStart,
  setSuggest,
  setTypeDef
} from "../actions"
import {IQuery} from "../.."

export const query = (initialState): any => reducerWithInitialState(initialState)
  .case(setQueryFields, (state, {searchFields, size, sortFields, start}): ReducerBuilder<IQuery> => ({
    ...state,
    searchFields,
    size,
    sortFields,
    start,
  }))
  .case(setQueryInput, (state, {stringInput}): ReducerBuilder<any> => ({
    ...state,
    stringInput,
  }))
  .case(setTypeDef, (state, {typeDef}): ReducerBuilder<any> => ({
    ...state,
    typeDef,
  }))
  .case(setSearchFields, (state, {searchFields}): ReducerBuilder<any> => ({
    ...state,
    searchFields,
  }))
  .case(setSortFields, (state, {sortFields}): ReducerBuilder<any> => ({
    ...state,
    sortFields,
  }))
  .case(setStart, (state, {start}): ReducerBuilder<any> => ({
    ...state,
    start
  }))
  .case(setSuggest, (state, {stringInput, suggest}): ReducerBuilder<any> => ({
    ...state,
    stringInput,
    suggest
  }))
  .case(setSelectedFilters, (state, {field, filters}): ReducerBuilder<any> => ({
    ...state,
    filters: {
      ...state.filters,
      [field]: filters
    }
  }))

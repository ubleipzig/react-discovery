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
  .case(setQueryFields, (state, {searchFields, size, sortFields, start, url}): ReducerBuilder<IQuery> => ({
    ...state,
    searchFields,
    size,
    sortFields,
    start,
    url
  }))
  .case(setQueryInput, (state, {stringInput}): ReducerBuilder<IQuery> => ({
    ...state,
    stringInput,
  }))
  .case(setTypeDef, (state, {typeDef}): ReducerBuilder<IQuery> => ({
    ...state,
    typeDef,
  }))
  .case(setSearchFields, (state, {searchFields}): ReducerBuilder<IQuery> => ({
    ...state,
    searchFields,
  }))
  .case(setSortFields, (state, {sortFields}): ReducerBuilder<IQuery> => ({
    ...state,
    sortFields,
  }))
  .case(setStart, (state, {start}): ReducerBuilder<IQuery> => ({
    ...state,
    start
  }))
  .case(setSuggest, (state, {stringInput, suggest}): ReducerBuilder<IQuery> => ({
    ...state,
    stringInput,
    suggest
  }))
  .case(setSelectedFilters, (state, {field, filters}): ReducerBuilder<IQuery> => ({
    ...state,
    filters: {
      ...state.filters,
      [field]: filters
    }
  }))

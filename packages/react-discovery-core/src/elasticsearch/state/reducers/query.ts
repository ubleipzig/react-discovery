import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  setAggs,
  setFrom,
  setGroupField,
  setQueryFields,
  setQueryInput,
  setSearchFields,
  setSelectedFilters,
  setSize,
  setSortFields,
  setTypeDef
} from "../actions"
import {IElasticSearchQuery} from "../../index"

export const query = (initialState): ReducerBuilder<IElasticSearchQuery> => reducerWithInitialState(initialState)
  .case(setAggs, (state, {aggs}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    aggs
  }))
  .case(setGroupField, (state, {groupField}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    groupField,
  }))
  .case(setQueryFields, (state, {aggs, filters, searchFields, size, sortFields, from, stringInput}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    aggs,
    filters,
    from,
    searchFields,
    size,
    sortFields,
    stringInput,
  }))
  .case(setQueryInput, (state, {stringInput}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    stringInput,
  }))
  .case(setTypeDef, (state, {typeDef}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    typeDef,
  }))
  .case(setSearchFields, (state, {searchFields}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    searchFields,
  }))
  .case(setSortFields, (state, {sortFields}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    sortFields,
  }))
  .case(setFrom, (state, {from}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    from
  }))
  .case(setSize, (state, {size}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    size
  }))
  .case(setSelectedFilters, (state, {field, filters}): ReducerBuilder<IElasticSearchQuery> => ({
    ...state,
    filters: {
      ...state.filters,
      [field]: filters
    }
  }))

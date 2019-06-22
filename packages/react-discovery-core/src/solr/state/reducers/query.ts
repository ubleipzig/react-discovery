import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {
  setGroupField,
  setQueryFields,
  setQueryInput,
  setSearchFields,
  setSelectedFilters,
  setSortFields,
  setStart,
  setSuggest,
  setTypeDef
} from "../actions"
import {ISolrQuery} from "../../index"

export const query = (initialState): ReducerBuilder<ISolrQuery> => reducerWithInitialState(initialState)
  .case(setGroupField, (state, {groupField}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    groupField,
  }))
  .case(setQueryFields, (state, {filters, searchFields, size, sortFields, start, stringInput, url}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    filters,
    searchFields,
    size,
    sortFields,
    start,
    stringInput,
    url
  }))
  .case(setQueryInput, (state, {stringInput}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    stringInput,
  }))
  .case(setTypeDef, (state, {typeDef}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    typeDef,
  }))
  .case(setSearchFields, (state, {searchFields}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    searchFields,
  }))
  .case(setSortFields, (state, {sortFields}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    sortFields,
  }))
  .case(setStart, (state, {start}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    start
  }))
  .case(setSuggest, (state, {stringInput, suggest}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    stringInput,
    suggest
  }))
  .case(setSelectedFilters, (state, {field, filters}): ReducerBuilder<ISolrQuery> => ({
    ...state,
    filters: {
      ...state.filters,
      [field]: filters
    }
  }))

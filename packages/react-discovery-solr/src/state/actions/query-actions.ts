import {ISearchField, ISortField} from "../../index"
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_QUERY_FIELDS = "SET_QUERY_FIELDS"
const SET_SEARCH_FIELDS = "SET_SEARCH_FIELDS"
const SET_SELECTED_FILTERS = "SET_SELECTED_FILTERS"
const SET_SORT_FIELDS = "SET_SORT_FIELDS"
const SET_START = "SET_START"
const SET_SUGGEST = "SET_SUGGEST"
const SET_QUERY_INPUT = "SET_QUERY_INPUT"
const SET_TYPE_DEF = "SET_TYPE_DEF"

export const setQueryFields = actionCreator<{searchFields: ISearchField[]; sortFields: ISortField[];
  start: number; size: number; url: string;}>(SET_QUERY_FIELDS)
export const setStart = actionCreator<{start: number}>(SET_START)
export const setQueryInput = actionCreator<{stringInput: string}>(SET_QUERY_INPUT)
export const setTypeDef = actionCreator<{typeDef: string}>(SET_TYPE_DEF)
export const setSearchFields = actionCreator<{searchFields}>(SET_SEARCH_FIELDS)
export const setSortFields = actionCreator<{sortFields}>(SET_SORT_FIELDS)
export const setSelectedFilters = actionCreator<{field: string; filters: string[]}>(SET_SELECTED_FILTERS)
export const setSuggest = actionCreator<{suggest: boolean; stringInput?: string}>(SET_SUGGEST)

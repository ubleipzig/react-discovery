import {IFilters, ISearchField, ISortField} from "@react-discovery/configuration"
import {IAggRecord} from "../../index"
import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

const SET_AGGS = "SET_AGGS"
const SET_GROUP_FIELD = "SET_GROUP_FIELD"
const SET_QUERY_FIELDS = "SET_QUERY_FIELDS"
const SET_SEARCH_FIELDS = "SET_SEARCH_FIELDS"
const SET_SELECTED_FILTERS = "SET_SELECTED_FILTERS"
const SET_SORT_FIELDS = "SET_SORT_FIELDS"
const SET_FROM = "SET_FROM"
const SET_SIZE = "SET_SIZE"
const SET_QUERY_INPUT = "SET_QUERY_INPUT"
const SET_TYPE_DEF = "SET_TYPE_DEF"

export const setAggs = actionCreator<{aggs: IAggRecord}>(SET_AGGS)
export const setGroupField = actionCreator<{groupField: string}>(SET_GROUP_FIELD)
export const setQueryFields = actionCreator<{aggs: any; filters: IFilters; searchFields: ISearchField[]; sortFields: ISortField[];
  from: number; size: number; stringInput: string;}>(SET_QUERY_FIELDS)
export const setFrom = actionCreator<{from: number}>(SET_FROM)
export const setSize = actionCreator<{size: number}>(SET_SIZE)
export const setQueryInput = actionCreator<{stringInput: string}>(SET_QUERY_INPUT)
export const setTypeDef = actionCreator<{typeDef: string}>(SET_TYPE_DEF)
export const setSearchFields = actionCreator<{searchFields}>(SET_SEARCH_FIELDS)
export const setSortFields = actionCreator<{sortFields}>(SET_SORT_FIELDS)
export const setSelectedFilters = actionCreator<{field: string; filters: string[]}>(SET_SELECTED_FILTERS)


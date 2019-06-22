import {IAggregation, IHits, IResponse} from '../../..'
import {IFilters, ISolrQuery, IState} from "../../index"
import {
  ISearchField,
  ISortField
} from "@react-discovery/configuration"
import {FieldConstants} from '../../enum'
import {useSelector} from "react-redux"

const typeField = FieldConstants.TYPE_FIELD

export const getAggregation = (field): IAggregation => {
  return useSelector((state: IState): IAggregation =>
    state.response && state.response.aggregations && state.response.aggregations[field])
}

export const getFilters = (): IFilters => {
  return useSelector((state: IState): IFilters => state.query.filters)
}

export const getFiltersForField = (field): string[] => {
  return useSelector((state: IState): string[] => state.query.filters[field])
}

export const getFilterType = (): string => {
  return useSelector((state: IState): string => state.query.filters && state.query.filters[typeField] && state.query.filters[typeField][0])
}

export const getGroupField = (): string => {
  return useSelector((state: IState): string => state.query.groupField)
}

export const getIsHighlighted = (): boolean => {
  return useSelector((state: IState): boolean => state.query.isHighlighted)
}

export const getHits = (): IHits => {
  return useSelector((state: IState): IHits => state.response.hits)
}

export const getNumFound = (): number => {
  return useSelector((state: IState): number => state.response.hits && state.response.hits.numFound)
}

export const getResponse = (): IResponse => {
  return useSelector((state: IState): IResponse => state.response)
}

export const getSearchFields = (): ISearchField[] => {
  return useSelector((state: IState): ISearchField[] => state.query && state.query.searchFields)
}

export const getSize = (): number => {
  return useSelector((state: IState): number => state.query.size)
}

export const getSortFields = (): ISortField[] => {
  return useSelector((state: IState): ISortField[] => state.query.sortFields)
}

export const getStart = (): number => {
  return useSelector((state: IState): number => state.query.start)
}

export const getStringInput = (): string => {
  return useSelector((state: IState): string => state.query.stringInput)
}

export const getSuggest = (): boolean => {
  return useSelector((state: IState): boolean => state.query.suggest)
}

export const getSuggestDictionary = (): string => {
  return useSelector((state: IState): string => state.query.suggestDictionary)
}

export const getTerms = (): string[] => {
  return useSelector((state: IState): string[] => state.suggestions && state.suggestions.terms)
}

export const getTypeDef = (): string => {
  return useSelector((state: IState): string => state.query.typeDef)
}

export const getUrl = (): string => {
  return useSelector((state: IState): string => state.query.url)
}

export const getDefaultQuery = (): ISolrQuery => {
  const filters = getFilters()
  const groupField = getGroupField()
  const isHighlighted = getIsHighlighted()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  const start = getStart()
  const stringInput = getStringInput()
  const suggest = getSuggest()
  const suggestDictionary = getSuggestDictionary()
  const typeDef = getTypeDef()
  const url = getUrl()
  return {filters, groupField, isHighlighted, searchFields, size, sortFields, start, stringInput, suggest, suggestDictionary, typeDef, url}
}

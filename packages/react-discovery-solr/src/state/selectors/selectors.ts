import {
  IAggregation,
  IFilters,
  IHitComponent,
  ILanguage,
  IQuery,
  IRefinementListFilter,
  ISearchField,
  ISortField
} from "../../api"
import {useSelector} from "react-redux"

export const getAggregation = (field): IAggregation => {
  return useSelector((state: any): IAggregation =>
    state.response && state.response.aggregations && state.response.aggregations[field])
}

export const getCurrentLanguage = (): string => {
  return useSelector((state: any): string => state.config.currentLanguage)
}

export const getDocTypes = (): string[] => {
  return useSelector((state: any): string[] => state.config.collections[state.config.currentCollection].docTypes)
}

export const getFilters = (): IFilters => {
  return useSelector((state: any): IFilters => state.query.filters)
}

export const getFiltersForField = (field): string[] => {
  return useSelector((state: any): string[] => state.query.filters[field])
}

export const getFilterType = (): string => {
  return useSelector((state: any): string => state.query.filters && state.query.filters.type_s && state.query.filters.type_s[0])
}

export const getHighlighting = (): boolean => {
  return useSelector((state: any): boolean => state.query.highlighting)
}

export const getHitComponents = (): IHitComponent[] => {
  return useSelector((state: any): IHitComponent[] => state.config.collections[state.config.currentCollection].hitComponents)
}

export const getHits = (): [] => {
  return useSelector((state: any): [] => state.response.hits)
}

export const getIsPersisted = (): boolean => {
  return useSelector((state: any): boolean => state.config.isPersisted)
}

export const getIsViewExpanded = (): boolean => {
  return useSelector((state: any): boolean => state.config.isViewExpanded)
}

export const getLanguages = (): ILanguage[] => {
  return useSelector((state: any): ILanguage[] => state.config.languages)
}

export const getNumFound = (): number => {
  return useSelector((state: any): number => state.response.hits && state.response.hits.numFound)
}

export const getRefinementListFilters = (): IRefinementListFilter[] => {
  return useSelector((state: any): any =>
    state.config.collections[state.config.currentCollection].refinementListFilters)
}

export const getResponse = (): any => {
  return useSelector((state: any): any => state.response)
}

export const getSearchFields = (): ISearchField[] => {
  return useSelector((state: any): ISearchField[] => state.query && state.query.searchFields)
}

export const getSelectedIndex = (): number => {
  return useSelector((state: any): number => state.config.selectedIndex)
}

export const getSize = (): number => {
  return useSelector((state: any): number => state.query.size)
}

export const getSortFields = (): ISortField[] => {
  return useSelector((state: any): ISortField[] => state.query.sortFields)
}

export const getStart = (): number => {
  return useSelector((state: any): number => state.query.start)
}

export const getStringInput = (): string => {
  return useSelector((state: any): string => state.query.stringInput)
}

export const getSuggest = (): boolean => {
  return useSelector((state: any): boolean => state.query.suggest)
}

export const getSuggestDictionary = (): string => {
  return useSelector((state: any): string => state.query.suggestDictionary)
}

export const getTerms = (): string[] => {
  return useSelector((state: any): string[] => state.suggestions && state.suggestions.terms)
}

export const getTypeDef = (): string => {
  return useSelector((state: any): string => state.query.typeDef)
}

export const getUrl = (): string => {
  return useSelector((state: any): string => state.query.url)
}

export const getInitialQuery = (): IQuery => {
  const filters = getFilters()
  const highlighting = getHighlighting()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  const start = getStart()
  const stringInput = getStringInput()
  const suggest = getSuggest()
  const suggestDictionary = getSuggestDictionary()
  const typeDef = getTypeDef()
  const url = getUrl()
  return {filters, highlighting, searchFields, size, sortFields, start, stringInput, suggest, suggestDictionary, typeDef, url}
}

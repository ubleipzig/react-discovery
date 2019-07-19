import {IFilters, IHits, IState} from '../../..'
import {ISearchField, ISortField, getRefinementListFilters} from "@react-discovery/configuration"
import {FieldConstants} from '../../enum'
import {IElasticSearchQuery} from "../../index"
import {useSelector} from "react-redux"

const typeField = FieldConstants.TYPE_FIELD

export const getAggs = (): IFilters => {
  return useSelector((state: any): any => state.query.aggs)
}

export const getFilters = (): IFilters => {
  return useSelector((state: IState): IFilters => state.query.filters)
}

export const getFilterType = (): string => {
  return useSelector((state: IState): string => state.query.filters && state.query.filters[typeField] && state.query.filters[typeField][0])
}

export const getHits = (): IHits => {
  return useSelector((state: any): IHits => state.response.hits)
}

export const getNumFound = (): number => {
  return useSelector((state: any): number => state.response.hits && state.response.hits.numFound)
}

export const getSearchFields = (): ISearchField[] => {
  return useSelector((state: any): ISearchField[] => state.query && state.query.searchFields)
}

export const getSize = (): number => {
  return useSelector((state: any): number => state.query.size)
}

export const getSortFields = (): ISortField[] => {
  return useSelector((state: any): ISortField[] => state.query.sortFields)
}

export const getFrom = (): number => {
  return useSelector((state: any): number => state.query.from)
}

export const getStringInput = (): string => {
  return useSelector((state: any): string => state.query.stringInput)
}

export const getDefaultQuery = (): IElasticSearchQuery => {
  const aggs = getAggs()
  const filters = getFilters()
  const from = getFrom()
  const refinementListFilters = getRefinementListFilters()
  const stringInput = getStringInput()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  return {
    aggs,
    filters,
    from,
    refinementListFilters,
    searchFields,
    size,
    sortFields,
    stringInput
  }
}

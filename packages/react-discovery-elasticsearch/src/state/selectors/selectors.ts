import {IHitComponent, IHits, IQuery} from "../.."
import {ISearchField, ISortField} from "@react-discovery/configuration"
import {useSelector} from "react-redux"

export const getCurrentCollection = (): string => {
  return useSelector((state: any): string => state.config.currentCollection)
}

export const getCurrentLanguage = (): string => {
  return useSelector((state: any): string => state.config.currentLanguage)
}

export const getHitComponents = (): IHitComponent[] => {
  return useSelector((state: any): IHitComponent[] => state.config.collections[state.config.currentCollection].hitComponents)
}

export const getHits = (): IHits => {
  return useSelector((state: any): IHits => state.response.hits)
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

export const getStringInput = (): string => {
  return useSelector((state: any): string => state.query.stringInput)
}

export const getUrl = (): string => {
  return useSelector((state: any): string => state.config.url)
}

export const getDefaultQuery = (): IQuery => {
  const stringInput = getStringInput()
  const searchFields = getSearchFields()
  const size = getSize()
  const sortFields = getSortFields()
  return {
    searchFields,
    size,
    sortFields,
    stringInput}
}

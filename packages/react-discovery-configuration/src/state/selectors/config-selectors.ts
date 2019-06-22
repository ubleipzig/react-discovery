import {IDocType, IHitComponent, ILanguage, IRefinementListFilters} from "../.."
import {useSelector} from "react-redux"

export const getCurrentCollection = (): string => {
  return useSelector((state: any): string => state.config.currentCollection)
}

export const getCurrentLanguage = (): string => {
  return useSelector((state: any): string => state.config.currentLanguage)
}

export const getDocTypes = (): IDocType[] => {
  return useSelector((state: any): IDocType[] => state.config.collections[state.config.currentCollection].docTypes)
}

export const getHitComponents = (): IHitComponent[] => {
  return useSelector((state: any): IHitComponent[] => state.config.collections[state.config.currentCollection].hitComponents)
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

export const getPrimaryTypeField = (): string => {
  return useSelector((state: any): string => state.config.collections[state.config.currentCollection].primaryTypeField)
}

export const getRefinementListFilters = (): IRefinementListFilters => {
  return useSelector((state: any): IRefinementListFilters =>
    state.config.collections[state.config.currentCollection].refinementListFilters)
}

export const getRootContext = (): string => {
  return useSelector((state: any): string => state.config.rootContext)
}

export const getSelectedIndex = (): number => {
  return useSelector((state: any): number => state.config.selectedIndex)
}

export const getUrl = (): string => {
  return useSelector((state: any): string => state.config.url)
}
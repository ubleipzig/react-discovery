import {ICollection, IDocType, IHitComponent, ILanguage, IRefinementListFilters} from "../.."
import {useSelector} from "react-redux"

export const getCollections = (): string[] => {
  return useSelector((state: any): string[] => state.config.collections)
}

export const getCollectionByKey = (key: string): ICollection => {
  return useSelector((state: any): any => state.config.collections && state.config.collections[key])
}

export const getCurrentCollection = (): string => {
  return useSelector((state: any): string => state.config.currentCollection)
}

export const getCurrentGridViewerObjectThumbnail = (): string => {
  return useSelector((state: any): string => state.config.gridViewerObject && state.config.gridViewerObject.thumbnail)
}

export const getCurrentGridViewerObjectId = (): string => {
  return useSelector((state: any): string => state.config.gridViewerObject && state.config.gridViewerObject.id)
}

export const getCurrentLanguage = (): string => {
  return useSelector((state: any): string => state.config.currentLanguage)
}

export const getCurrentSearchContext = (): string => {
  return useSelector((state: any): string => state.config.rootContext + '/' + state.config.currentCollection)
}

export const getCurrentImageId = (): string => {
  return useSelector((state: any): any => state.config && state.config.currentImageId)
}

export const getCurrentUser = (): {} => {
  return useSelector((state: any): any => state.config && state.config.currentUser)
}

export const getDocTypes = (): IDocType[] => {
  return useSelector((state: any): IDocType[] => state.config.collections[state.config.currentCollection].docTypes)
}

export const getItemViewType = (id: string): string => {
  const itemViews = useSelector((state: any): boolean => state.config.itemViews)
  return itemViews && Object.keys(itemViews).length && itemViews[id]
}

export const getHitComponents = (): IHitComponent[] => {
  return useSelector((state: any): IHitComponent[] => state.config.collections[state.config.currentCollection].hitComponents)
}

export const getHitComponentConfig = (type): IHitComponent => {
  return useSelector((state: any): IHitComponent => state.config.collections[state.config.currentCollection].hitComponents
    && state.config.collections[state.config.currentCollection].hitComponents.filter((hc) => hc.hitComponent === type)[0])
}

export const getIsPersisted = (): boolean => {
  return useSelector((state: any): boolean => state.config.isPersisted)
}

export const getViewType = (): string => {
  return useSelector((state: any): string => state.config.viewType)
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

export const getSelectedTabForId = (id): number => {
  return useSelector((state: any): number => state.config.selectedTabs && state.config.selectedTabs[id])
}

export const getUrl = (): string => {
  return useSelector((state: any): string => state.config.url)
}

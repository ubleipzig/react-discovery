import {IConfig} from "@react-discovery/configuration"
import deepmerge from 'deepmerge'
import {hsp2} from './collections'

export const mergedCollections: any = deepmerge.all([hsp2])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "ox1"
const {collections} = mergedCollections
const {url} = collections[currentCollection]
export const rootConfig: IConfig = {
  collections: null,
  currentCollection,
  currentLanguage: 'en',
  expandedItems: null,
  isViewExpanded: false,
  languages: [
    {
      label: 'Deutsch',
      locale: 'de',
    },
    {
      label: 'English',
      locale: 'en',
    }],
  rootContext: '/search',
  selectedIndex: 0,
  url
}

export const localConfig: any = deepmerge(rootConfig, mergedCollections)

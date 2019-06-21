import {IConfig} from "@react-discovery/configuration"
import deepmerge from 'deepmerge'
import {ox1} from './collections'

export const mergedCollections: any = deepmerge.all([ox1])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "ox1"
const {collections} = mergedCollections
const {url} = collections[currentCollection]
export const rootConfig: IConfig = {
  collections: null,
  currentCollection,
  currentLanguage: 'en',
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
  rootContext: '/',
  selectedIndex: 0,
  url
}

export const localConfig: any = deepmerge(rootConfig, mergedCollections)

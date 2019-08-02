import {collections} from './collections'
import {IConfig} from "@react-discovery/configuration"
import deepmerge from 'deepmerge'

const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION
export const rootConfig: IConfig = {
  collections: {},
  currentCollection,
  currentLanguage: 'en',
  isViewExpanded: false,
  itemViews: {},
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
}

export const localConfig: any = deepmerge(rootConfig, collections)

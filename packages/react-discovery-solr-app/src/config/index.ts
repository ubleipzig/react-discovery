import {IConfig} from "@react-discovery/configuration"
import deepmerge from 'deepmerge'
import {test04} from './collections'

export const collections = deepmerge.all([test04])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "test04"

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
  selectedIndex: 0
}

export const localConfig: any = deepmerge(rootConfig, collections)

import {IConfig} from "@react-discovery/solr"
import deepmerge from 'deepmerge'
import {test02} from './collections'

export const collections = deepmerge.all([test02])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "test02"

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
  selectedIndex: 0
}

export const localConfig: any = deepmerge(rootConfig, collections)

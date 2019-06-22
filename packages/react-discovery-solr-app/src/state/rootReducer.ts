import {IConfig, config} from "@react-discovery/configuration"
import {ISolrQuery, SolrCore} from "@react-discovery/core"
import {Reducer, combineReducers} from "redux"
import {localConfig} from "../config"

const {collections, currentCollection} = localConfig
if (!(currentCollection in collections)) {
  throw new Error("current collection does not exist in collections configuration")
}
const {initialFilter, searchFields, sortFields, url} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)

export const initialQueryState: ISolrQuery = {
  fieldList: null,
  filters: initialFilter || {},
  isHighlighted: true,
  searchFields,
  size: 20,
  sortFields,
  start: null,
  stringInput: null,
  suggest: false,
  suggestDictionary: 'suggester',
  typeDef: 'edismax',
  url
}
const queryReducer: Reducer = SolrCore.state.query(initialQueryState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  query: queryReducer,
  response: SolrCore.state.response,
  suggestions: SolrCore.state.suggestions
})

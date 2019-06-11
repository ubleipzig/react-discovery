import {IConfig, IQuery, config, query, response, suggestions} from "@react-discovery/solr"
import {Reducer, combineReducers} from "redux"
import {localConfig} from "../config"

const {collections, currentCollection} = localConfig
const {initialFilter, searchFields, sortFields, url} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)

export const initialQueryState: IQuery = {
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
const queryReducer: Reducer = query(initialQueryState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  query: queryReducer,
  response,
  suggestions
})

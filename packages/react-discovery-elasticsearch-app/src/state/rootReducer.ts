import {IQuery, config, query, response} from "@react-discovery/elasticsearch"
import {Reducer, combineReducers} from "redux"
import {IConfig} from "@react-discovery/configuration"
import {localConfig} from "../config"

const {collections, currentCollection} = localConfig
if (!(currentCollection in collections)) {
  throw new Error("current collection does not exist in collections configuration")
}
const {searchFields, sortFields} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)

export const initialQueryState: IQuery = {
  searchFields,
  size: 20,
  sortFields,
  stringInput: null,
}

const queryReducer: Reducer = query(initialQueryState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  query: queryReducer,
  response,
})

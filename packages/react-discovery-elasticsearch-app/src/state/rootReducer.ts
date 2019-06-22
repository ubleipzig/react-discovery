import {IConfig, config} from "@react-discovery/configuration"
import {ESCore, IElasticSearchQuery} from "@react-discovery/core"
import {Reducer, combineReducers} from "redux"
import {localConfig} from "../config"

const {collections, currentCollection} = localConfig
if (!(currentCollection in collections)) {
  throw new Error("current collection does not exist in collections configuration")
}
const {searchFields, sortFields} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)

export const initialQueryState: IElasticSearchQuery = {
  from: 0,
  searchFields,
  size: 20,
  sortFields,
  stringInput: null,
}

const queryReducer: Reducer = ESCore.state.query(initialQueryState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  query: queryReducer,
  response: ESCore.state.response
})

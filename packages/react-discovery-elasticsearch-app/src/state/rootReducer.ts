import {ESCore, IElasticSearchQuery} from "@react-discovery/core"
import {IConfig, config} from "@react-discovery/configuration"
import {Reducer, combineReducers} from "redux"
import {iiif} from "@react-discovery/iiif"
import {localConfig} from "../config"
import {workspace} from "@react-discovery/workspace"
const {collections, currentCollection} = localConfig

if (!(currentCollection in collections)) {
  throw new Error("current collection does not exist in collections configuration")
}

const initialWorkspaceState = {
  layout: {},
  viewIdMap: {},
}

const initialIIIFState = {

}
const iiifReducer = iiif(initialIIIFState)
const workspaceReducer = workspace(initialWorkspaceState)
const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)
const initialQueryState: IElasticSearchQuery = {
  aggs: {},
  filters: {},
  from: 0,
  searchFields: [],
  size: 20,
  sortFields: [],
  stringInput: '',
}

const queryReducer: Reducer = ESCore.state.query(initialQueryState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  iiif: iiifReducer,
  query: queryReducer,
  response: ESCore.state.response,
  workspace: workspaceReducer
})

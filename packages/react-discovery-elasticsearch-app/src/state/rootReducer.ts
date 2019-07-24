import {ESCore, IElasticSearchQuery} from "@react-discovery/core"
import {IConfig, config} from "@react-discovery/configuration"
import {Reducer, combineReducers} from "redux"
import {localConfig} from "../config"
import {workspace} from "@react-discovery/workspace"
const {collections, currentCollection} = localConfig

if (!(currentCollection in collections)) {
  throw new Error("current collection does not exist in collections configuration")
}
const {initialFilter, refinementListFilters, searchFields, sortFields} = collections[currentCollection]

const initialWorkspaceState = {
  layout: {
    direction: 'row',
    first: "3809155f-56dc-4c6d-a097-4850bcb7e1d9",
    second: "5c3a9c1d-263d-48d7-9739-34e2df12f125",
    splitPercentage: 50,
  },
  viewIdMap: {
    "3809155f-56dc-4c6d-a097-4850bcb7e1d9": "data",
    "5c3a9c1d-263d-48d7-9739-34e2df12f125": "data",
  },
}

const workspaceReducer = workspace(initialWorkspaceState)
const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)
const aggs = ESCore.builders.buildAggs(refinementListFilters)
const initialQueryState: IElasticSearchQuery = {
  aggs,
  filters: initialFilter || {},
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
  response: ESCore.state.response,
  workspace: workspaceReducer
})

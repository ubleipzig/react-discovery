import '@react-discovery/i18n'
import {AnyAction, Reducer, Store, applyMiddleware, combineReducers, createStore} from "redux"
import {IConfig, localConfig} from "./config"
import {
  IQuery,
  config,
  query,
  response,
  suggestions
} from "@react-discovery/solr"
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {MinimalResultsViewer} from './components'
import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {composeWithDevTools} from 'redux-devtools-extension'

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware

const {collections, currentCollection} = localConfig
const {initialFilter, searchFields, sortFields, url} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer: Reducer = config(initialConfigState)

const initialQueryState: IQuery = {
  fieldList: null,
  filters: initialFilter || {},
  highlighting: true,
  searchFields,
  size: 20,
  sortFields,
  start: 0,
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

const store: Store = createStore(
  rootReducer(),
  ((window as any).Cypress && (window as any).initialState),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <MinimalResultsViewer/>
  </Provider>,
  document.getElementById("app")
)

if ((window as any).Cypress) {
  (window as any).store = store
}

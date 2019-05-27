import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import {MinimalResultsViewer} from './components'
import {
  config, IQuery,
  query,
  response,
  suggestions
} from "solr-react-faceted-search"
import {IConfig, localConfig} from "./config"

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware

const {collections, currentCollection} = localConfig
const {searchFields, sortFields, url} = collections[currentCollection]

const initialConfigState: IConfig = localConfig
const configReducer = config(initialConfigState)

const initialQueryState: IQuery = {
  fieldList: null,
  filters: [],
  highlighting: true,
  searchFields,
  size: 20,
  sortFields,
  start: 0,
  stringInput: null,
  suggest: false,
  suggestDictionary: 'suggester',
  typeDef: null,
  url
}
const queryReducer = query(initialQueryState)

export const rootReducer = (): any => combineReducers({
  config: configReducer,
  query: queryReducer,
  response,
  suggestions
})

const store = createStore(
  rootReducer(),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <MinimalResultsViewer/>
  </Provider>,
  document.getElementById("app")
)

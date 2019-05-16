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
} from "solr-react-faceted-search"
import {localConfig} from "./config"
const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware;

const {collections, currentCollection} = localConfig
const {searchFields, sortFields, url} = collections[currentCollection]

const initialQueryState: IQuery = {
  filters: [],
  highlighting: true,
  searchFields,
  size: 20,
  start: 0,
  stringInput: null,
  sortFields,
  suggest: false,
  suggestDictionary: 'suggester',
  typeDef: null,
  url
}

const queryReducer = query(initialQueryState)

export const rootReducer = (): any => combineReducers({
  config,
  query: queryReducer,
  response,
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

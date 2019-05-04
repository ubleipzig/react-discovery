import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {AnyAction, applyMiddleware, createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import {MinimalResultsViewer} from './components'
import {
  SolrClient,
  query,
  response,
} from "solr-react-faceted-search";
import {gettingstarted} from './config'
import { combineReducers } from 'redux'
const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware;

export const rootReducer = (): any => combineReducers({
  query,
  response,
});

const store = createStore(
  rootReducer(),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)

const {searchFields, sortFields, url} = gettingstarted
const solrClient = new SolrClient({searchFields, sortFields, url}, store)

ReactDOM.render(
  <Provider store={store}>
    <MinimalResultsViewer/>
  </Provider>,
  document.getElementById("app")
)

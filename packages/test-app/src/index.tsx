import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {AnyAction, applyMiddleware, createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import {MinimalResultsViewer} from './components'
import {
  query,
  response,
} from "solr-react-faceted-search"
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

ReactDOM.render(
  <Provider store={store}>
    <MinimalResultsViewer/>
  </Provider>,
  document.getElementById("app")
)

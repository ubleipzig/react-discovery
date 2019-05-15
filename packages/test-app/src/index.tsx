import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import {MinimalResultsViewer} from './components'
import {
  config,
  query,
  response,
} from "solr-react-faceted-search"
const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware;

export const rootReducer = (): any => combineReducers({
  config,
  query,
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

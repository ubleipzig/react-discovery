import '@react-discovery/i18n'
import {AnyAction, Store, applyMiddleware, createStore} from "redux"
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {MinimalResultsViewer} from './components'
import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from "./state"

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware

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

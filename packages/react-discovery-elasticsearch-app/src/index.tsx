import '@react-discovery/i18n'
import {AnyAction, Store, applyMiddleware, createStore} from "redux"
import {DiscoveryApp, ResultsList, Workspace} from './components'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {ElasticSearchProvider} from "@react-discovery/core"
import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {SimpleDataView} from '@react-discovery/views'
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from "./state"

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware
const routes =
  mount({
    '/': route({
      title: "React Discovery",
      view: <DiscoveryApp component={<ResultsList />}/>,
    }),
    '/detail/:id': route((req): any => {
      let id = req.params.id
      return {
        view: <DiscoveryApp component={<SimpleDataView id={id}/>}/>,
      }
    }),
    '/workspace': route((): any => {
      return {
        view: <DiscoveryApp component={<Workspace />}/>,
      }
    })
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
  <Router routes={routes}>
    <Provider store={store}>
      <ElasticSearchProvider
        useHistory={true}
      >
        <View/>
      </ElasticSearchProvider>
    </Provider>
  </Router>,
  document.getElementById("app")
)

if ((window as any).Cypress) {
  (window as any).store = store
}

import '@react-discovery/i18n'
import {AnyAction, Store, applyMiddleware, createStore} from "redux"
import {DetailsView, MinimalResultsViewer} from './components'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'

import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {SolrResponseProvider} from "@react-discovery/solr"
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from "./state"

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware

const routes =
  mount({
    '/': route({
      title: "React Discovery",
      view: <MinimalResultsViewer />,
    }),
    '/detail/:id': route((req): any => {
      let id = req.params.id
      return {
        view: <DetailsView id={id} />,
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
      <SolrResponseProvider
        useHistory={true}
      >
        <View/>
      </SolrResponseProvider>
    </Provider>
  </Router>,
  document.getElementById("app")
)

if ((window as any).Cypress) {
  (window as any).store = store
}

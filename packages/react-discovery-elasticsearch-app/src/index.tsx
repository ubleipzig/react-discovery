import '@react-discovery/i18n'
import {AnyAction, Store, applyMiddleware, createStore} from "redux"
import {Router, View} from 'react-navi'
import thunkMiddleware, {ThunkMiddleware} from 'redux-thunk'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {ElasticSearchProvider} from "@react-discovery/core"
import {FirebaseAppProvider} from '@use-firebase/app'
import {FirebaseAuthProvider} from '@use-firebase/auth'
import {Provider} from 'react-redux'
import React from "react"
import ReactDOM from "react-dom"
import {composeWithDevTools} from 'redux-devtools-extension'
import {firebaseConfig} from './config'
import {rootReducer} from "./state"
import {routes} from './routes'

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

const client = new ApolloClient({
  uri: 'https://apollo.iiif.cloud'
});

ReactDOM.render(
  <Router routes={routes}>
    <Provider store={store}>
      <FirebaseAppProvider config={firebaseConfig}>
        <FirebaseAuthProvider>
          <ElasticSearchProvider
            useHistory={true}
          >
            <ApolloProvider client={client}>
              <View/>
            </ApolloProvider>
          </ElasticSearchProvider>
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    </Provider>
  </Router>,
  document.getElementById("app")
)

if ((window as any).Cypress) {
  (window as any).store = store
}

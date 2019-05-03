import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import { createStore } from "redux"
import { devToolsEnhancer } from 'redux-devtools-extension'
import {MinimalResultsViewer} from './components'
import {
  SolrClient,
  solrReducer
} from "solr-react-faceted-search";
import {gettingstarted} from './config'

const solrClient = new SolrClient({
  url: "http://localhost/solr/gettingstarted/query",
  searchFields: gettingstarted.searchFields,
  sortFields: gettingstarted.sortFields,
  onChange: (state) => store.dispatch({type: "SET_SOLR_STATE", state: state})
})

const store = createStore(
  solrReducer,
  devToolsEnhancer({}));

ReactDOM.render(
  <Provider store={store}>
    <MinimalResultsViewer
      fields={gettingstarted.searchFields}
    />
  </Provider>,
  document.getElementById("app")
)

document.addEventListener("DOMContentLoaded", () => {
  solrClient.initialize();
});

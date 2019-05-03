import {queryReducer, resultsReducer, suggestionsReducer, suggestQueryReducer} from "../state/reducers";
// import { submitQuery, fetchCsv } from "./server";
import server from "./server";

interface ISolrClientOptions {
  onChange: Function
}

class SolrClient {
  onChange: Function
  state: any
  settings: any

  static mock(settings = {}): SolrClient {
    return new SolrClient(settings);
  }

  constructor(settings: any) {
    const {onChange} = settings;

    this.onChange = onChange;
    delete settings.onChange;

    this.state = {
      query: settings,
      results: {
        facets: [],
        docs: [],
        highlighting: [],
        numFound: 0
      }
    };
    this.settings = {...settings};

    if (!this.state.query.pageStrategy) {
      this.state.query.pageStrategy = "paginate";
    }
    if (!this.state.query.rows) {
      this.state.query.rows = 20;
    }

    if (this.state.query.pageStrategy === "cursor" && !this.state.query.idField) {
      throw new Error("Pagination strategy 'cursor' requires a unique 'idField' to be passed.");
    }
  }


  setInitialQuery(queryToMerge) {
    const searchFieldsToMerge = queryToMerge.searchFields || [];
    const sortFieldsToMerge = queryToMerge.sortFields || [];

    this.state.query.searchFields = this.state.query.searchFields
      .map((sf) => searchFieldsToMerge.map((sfm) => sfm.field).indexOf(sf.field) > -1
        ? {...sf, value: searchFieldsToMerge.find((sfm) => sfm.field === sf.field).value}
        : sf);

    this.state.query.sortFields = this.state.query.sortFields
      .map((sf) => sortFieldsToMerge.map((sfm) => sfm.field).indexOf(sf.field) > -1
        ? {...sf, value: sortFieldsToMerge.find((sfm) => sfm.field === sf.field).value}
        : sf);
  }

  initialize() {
    const {query} = this.state;
    const {pageStrategy} = query;
    const payload = {
      type: "SET_QUERY_FIELDS",
      ...query,
      start: pageStrategy === "paginate" ? 0 : null
    };
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  resetSearchFields() {
    const {query} = this.state;
    const {pageStrategy} = query;
    const payload = {
      type: "SET_QUERY_FIELDS",
      ...this.settings,
      start: pageStrategy === "paginate" ? 0 : null
    };
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  sendQuery(query = this.state.query) {
    delete query.cursorMark;
    this.state.query = query;
    server.submitQuery(query, (action) => {
      this.state.results = resultsReducer(this.state.results, action);
      this.state.query = queryReducer(this.state.query, action);
      this.onChange(this.state, this.getHandlers());
    });
  }

  setSuggestQuery(query, autocomplete, value) {
    const {searchFields} = query;
    // Add the current text field value to the searchFields array.
    const newFields = searchFields
      .map((searchField) => searchField.field === query.mainQueryField ? {...searchField, value} : searchField);
    const payload = {
      type: "SET_SUGGEST_QUERY",
      suggestQuery: {
        isD7: query.isD7,
        searchFields: newFields,
        sortFields: query.sortFields,
        filters: query.filters,
        userpass: autocomplete.userpass || "",
        mainQueryField: query.mainQueryField,
        start: 0,
        proxyIsDisabled: autocomplete.proxyIsDisabled,
        url: autocomplete.url,
        mode: autocomplete.mode,
        rows: autocomplete.suggestionRows || 5,
        appendWildcard: autocomplete.appendWildcard || false,
        value
      }
    };
    this.sendSuggestQuery(suggestQueryReducer(this.state.suggestQuery, payload));
  }

  sendSuggestQuery(suggestQuery = this.state.suggestQuery) {
    this.state.suggestQuery = suggestQuery;
    server.submitSuggestQuery(suggestQuery, (action) => {
      this.state.suggestions = suggestionsReducer(this.state.suggestions, action);
      this.state.suggestQuery = suggestQueryReducer(this.state.suggestQuery, action);
      this.onChange(this.state, this.getHandlers());
    });
  }

  sendNextCursorQuery() {
    server.submitQuery(this.state.query, (action) => {
      this.state.results = resultsReducer(this.state.results, {
        ...action,
        type: action.type === "SET_RESULTS" ? "SET_NEXT_RESULTS" : action.type
      });
      this.state.query = queryReducer(this.state.query, action);
      this.onChange(this.state, this.getHandlers());
    });
  }

  fetchCsv() {
    server.fetchCsv(this.state.query, (data) => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:application/csv;charset=utf-8," + encodeURIComponent(data));
      element.setAttribute("download", "export.csv");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  setCurrentPage(page) {
    const {query} = this.state;
    const {rows} = query;
    const payload = {type: "SET_START", newStart: page * rows};
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  setGroup(group) {
    const payload = {type: "SET_GROUP", group};
    this.sendQuery(queryReducer(this.state.query, payload));
  }


  setSearchFieldValue(field, value) {
    const {query} = this.state;
    const {searchFields} = query;
    const newFields = searchFields
      .map((searchField) => searchField.field === field ? {...searchField, value} : searchField);
    const payload = {type: "SET_SEARCH_FIELDS", newFields};
    this.sendQuery(queryReducer(this.state.query, payload));
    // Enable the the autosuggest input to be cleared cleared
    // but only if autocomplete has been configured.
    if (Object.hasOwnProperty.call(this.state, "suggestQuery")) {
      this.state.suggestQuery = suggestQueryReducer(this.state.suggestQuery, payload);
    }
  }

  setFacetSort(field, value) {
    const {query} = this.state;
    const {searchFields} = query;
    const newFields = searchFields
      .map((searchField) => searchField.field === field ? {...searchField, facetSort: value} : searchField);
    const payload = {type: "SET_SEARCH_FIELDS", newFields};
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  setSortFieldValue(field, value) {
    const {query} = this.state;
    const {sortFields} = query;
    const newSortFields = sortFields
      .map((sortField) => sortField.field === field ? {...sortField, value} : {...sortField, value: null});
    const payload = {type: "SET_SORT_FIELDS", newSortFields};
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  setFilters(filters) {
    const payload = {type: "SET_FILTERS", newFilters: filters};
    this.sendQuery(queryReducer(this.state.query, payload));
  }

  setCollapse(field, value) {
    const {query} = this.state;
    const {searchFields} = query;
    const newFields = searchFields
      .map((searchField) => searchField.field === field ? {...searchField, collapse: value} : searchField);
    const payload = {type: "SET_SEARCH_FIELDS", newFields};
    this.state.query = queryReducer(this.state.query, payload);
    this.onChange(this.state, this.getHandlers());
  }

  getHandlers() {
    return {
      onTextInputChange: this.setSuggestQuery.bind(this),
      onSortFieldChange: this.setSortFieldValue.bind(this),
      onSearchFieldChange: this.setSearchFieldValue.bind(this),
      onFacetSortChange: this.setFacetSort.bind(this),
      onPageChange: this.setCurrentPage.bind(this),
      onNextCursorQuery: this.sendNextCursorQuery.bind(this),
      onSetCollapse: this.setCollapse.bind(this),
      onNewSearch: this.resetSearchFields.bind(this),
      onCsvExport: this.fetchCsv.bind(this),
      onGroupChange: this.setGroup.bind(this)
    };
  }
}

export {
  SolrClient
};

const initialState = {
  query: {},
  result: {}
}

export const solrReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SOLR_STATE":
      return {...state, ...action.state}
  }
}

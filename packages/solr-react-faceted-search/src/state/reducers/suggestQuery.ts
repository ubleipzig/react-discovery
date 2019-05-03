const initialState = {};

const setSuggestQuery = ({}, action) => {
  return {
    ...action.suggestQuery
  };
};

const setSuggestQueryField = (state, action) => {
  // Clear the suggestQueryField data only if the search field has been cleared.
  if (action.newFields.filter(field => field.field === "tm_rendered_item" && field.value ==="").length) {
    return Object.assign({},
      ...state,
      {
        suggestQuery: {
          value: ""
        }
      },
    );
  }
  return {
    ...state
  };
};

export const suggestQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUGGEST_QUERY":
      return setSuggestQuery(state, action);
    case "SET_SEARCH_FIELDS":
      return setSuggestQueryField(state, action);
  }

  return state;
}

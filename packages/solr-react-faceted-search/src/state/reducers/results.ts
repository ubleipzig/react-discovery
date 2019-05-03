const initialState: any = {};

const tryGroupedResultCount = (data) => {
  if (data.grouped) {
    for (let key in data.grouped) {
      if (data.grouped[key].matches) {
        return data.grouped[key].matches;
      }
    }
  }
  return 0;
};

export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RESULTS":
      return {
        ...state,
        docs: action.data.response ? action.data.response.docs : [],
        grouped: action.data.grouped || {},
        numFound: action.data.response ? action.data.response.numFound : tryGroupedResultCount(action.data),
        facets: action.data.facet_counts.facet_fields,
        highlighting: action.data.highlighting ? action.data.highlighting : [],
        pending: false
      };

    case "SET_NEXT_RESULTS":
      return {
        ...state,
        docs: state.docs.concat(action.data.response.docs),
        pending: false
      };

    case "SET_RESULTS_PENDING":
      return {
        ...state, pending: true
      };
  }

  return state;
}

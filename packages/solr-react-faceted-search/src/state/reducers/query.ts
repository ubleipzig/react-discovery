const initialState: any = {};

const setQueryFields = (state, action) => {
  return {
    ...state,
    searchFields: action.payload.query.searchFields,
    sortFields: action.payload.query.sortFields,
    url: action.payload.query.url,
    rows: action.payload.query.rows,
    pageStrategy: action.payload.query.pageStrategy,
    start: action.payload.start,
    group: action.payload.query.group,
    hl: action.payload.query.hl
  };
};

export const query = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUERY_FIELDS":
      return setQueryFields(state, action);
    case "SET_SEARCH_FIELDS":
      return {...state, searchFields: action.payload.newFields, start: state.pageStrategy === "paginate" ? 0 : null};
    case "SET_SORT_FIELDS":
      return {...state, sortFields: action.payload.newSortFields, start: state.pageStrategy === "paginate" ? 0 : null};
    case "SET_FILTERS":
      return {...state, filters: action.payload.newFilters, start: state.pageStrategy === "paginate" ? 0 : null};
    case "SET_START":
      return {...state, start: action.payload.newStart};
    case "SET_RESULTS":
      return action.data.nextCursorMark ? {...state, cursorMark: action.payload.data.nextCursorMark} : state;
    case "SET_GROUP":
      return {...state, group: action.payload.group};
    default:
      return state
  }
}

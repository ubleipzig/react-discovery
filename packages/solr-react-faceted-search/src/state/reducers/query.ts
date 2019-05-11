import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {setDisMaxQuery, setQueryFields, setSearchFields, setSortFields, setStart} from "../actions"
const initialState: any = {};

export const query = reducerWithInitialState(initialState)
  .caseWithAction(setQueryFields, (state, action: any) => ({
    ...state,
    group: action.payload.group,
    hl: action.payload.hl,
    pageStrategy: action.payload.pageStrategy,
    searchFields: action.payload.searchFields,
    sortFields: action.payload.sortFields,
    size: action.payload.rows,
    start: action.payload.start,
  }))
  .caseWithAction(setDisMaxQuery, (state, action: any) => ({
    ...state,
    stringInput: action.payload.stringInput,
    typeDef: action.payload.typeDef,
  }))
  .caseWithAction(setSearchFields, (state, action: any) => ({
    ...state,
    searchFields: action.payload.searchFields,
    start: state.query.pageStrategy === "paginate" ? 0 : null
  }))
  .caseWithAction(setSortFields, (state, action: any) => ({
    ...state,
    sortFields: action.payload.sortFields,
    start: state.query.pageStrategy === "paginate" ? 0 : null
  }))
  .caseWithAction(setStart, (state, action: any) => ({
    ...state,
    start: action.payload.newStart
  }))

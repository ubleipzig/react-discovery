import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {fetchSolrSuggestions} from '../actions'

interface ISuggestionsState {
  suggester: {};
}

const initialState: ISuggestionsState = {
  suggester: {},
}

const buildTerms = (suggester): string[] => {
  const suggestions: any = Object.values(suggester)[0]
  return suggestions.suggestions.map((s): string => s.term)
}
export const suggestions = reducerWithInitialState(initialState)
  .case(fetchSolrSuggestions.started, (state): any => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchSolrSuggestions.done, (state: ISuggestionsState, action: any): any => ({
    ...state,
    suggester: action.payload.result.suggest && action.payload.result.suggest.suggester,
    terms: action.payload.result.suggest && buildTerms(action.payload.result.suggest.suggester),
    updating: false,
    url: action.payload.params.url,
  }))
  .case(fetchSolrSuggestions.failed, (state, { error }): any => ({
    ...state,
    error,
    updating: false,
  }))

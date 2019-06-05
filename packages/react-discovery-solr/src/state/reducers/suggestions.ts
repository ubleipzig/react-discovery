import {fetchSolrSuggestions} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

interface ISuggestionsState {
  suggester: {};
}

const initialState: ISuggestionsState = {
  suggester: {},
}

const buildTerms = (suggester): string[] => {
  const [ suggestions]: any = Object.values(suggester)
  return suggestions.suggestions.map((s): string => s.term)
}

export const suggestions = reducerWithInitialState(initialState)
  .case(fetchSolrSuggestions.started, (state): any => ({
    ...state,
    updating: true
  }))
  .case(fetchSolrSuggestions.done, (state: ISuggestionsState, {params, result}): any => ({
    ...state,
    suggester: result.suggest && result.suggest.suggester,
    terms: result.suggest && buildTerms(result.suggest.suggester),
    updating: false,
    url: params.url,
  }))
  .case(fetchSolrSuggestions.failed, (state, { error }): any => ({
    ...state,
    error,
    updating: false,
  }))

import {ISuggestions} from "../.."
import {fetchSolrSuggestions} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

const initialState: ISuggestions = {
  suggester: {},
  terms: [],
  url: null
}

interface ISuggestion {
  numFound: number;
  suggestions: ITerm[];
}

interface ITerm {
  payload: string;
  term: string;
  weight: number;
}

const buildTerms = (suggester): string[] => {
  const [suggestions]: ISuggestion[] = Object.values(suggester)
  return suggestions.suggestions.map((s): string => s.term)
}

export const suggestions = reducerWithInitialState(initialState)
  .case(fetchSolrSuggestions.started, (state): ISuggestions => ({
    ...state,
    updating: true
  }))
  .case(fetchSolrSuggestions.done, (state: ISuggestions, {params, result}): ISuggestions => ({
    ...state,
    suggester: result.suggest && result.suggest.suggester,
    terms: result.suggest && buildTerms(result.suggest.suggester),
    updating: false,
    url: params.url,
  }))
  .case(fetchSolrSuggestions.failed, (state, { error }): ISuggestions => ({
    ...state,
    error,
    updating: false,
  }))

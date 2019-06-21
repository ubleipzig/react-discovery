import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {ElasticSearchConstants} from "../../enum"
import {IConfig} from "@react-discovery/configuration"
import {setUrl} from "../actions"

export const config = (initialState): ReducerBuilder<IConfig> => reducerWithInitialState(initialState)
  .case(setUrl, (state, {url}): ReducerBuilder<IConfig> => ({
    ...state,
    url: url + ElasticSearchConstants.SEARCH
  }))


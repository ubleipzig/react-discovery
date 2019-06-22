import * as builders from './query-builders'
import * as enums from './enum'
import * as state from './state'
import {ISearchField, ISortField} from "@react-discovery/configuration"

export const ESCore = {
  builders,
  enums,
  state
}

export * from './components'

export interface IElasticSearchQuery {
  query?: any;
  searchFields: ISearchField[];
  size: number;
  sortFields: ISortField[];
  from: number;
  stringInput: string;
}

export interface IFetchElasticSearchResponseParams {
  json: string;
  url: string;
}

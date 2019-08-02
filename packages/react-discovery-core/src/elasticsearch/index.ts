import * as builders from './query-builders'
import * as enums from './enum'
import * as state from './state'
import {IRefinementListFilters, ISearchField, ISortField} from "@react-discovery/configuration"

export const ESCore = {
  builders,
  enums,
  state
}

export * from './components'

export interface IElasticSearchQuery {
  aggs: any;
  filters: IFilters;
  query?: any;
  refinementListFilters?: IRefinementListFilters;
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

export interface IFetchElasticSearchDocumentParams {
  url: string;
}

export interface IFilters {
  [field: string]: string[];
}


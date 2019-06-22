import * as builders from './query-builders'
import * as enums from './enum'
import * as state from './state'
import {IConfig, ISearchField, ISortField} from "@react-discovery/configuration"
import {IResponse} from '..'

export const SolrCore = {
  builders,
  enums,
  state
}

export * from './components'

export interface IDocList {
  numFound: number;
  start: number;
  docs: any[];
}

export interface IFetchSolrResponseParams {
  requestURI: string;
  url?: string;
}

export interface IFilters {
  [field: string]: string[];
}

export interface IGroup {
  doclist: IDocList;
  groupValue: string;
}

export interface IGroups {
  matches: number;
  groups: IGroup[];
}

export type IGrouped = Record<string, IGroups>

export interface ISolrQuery {
  facetLimit?: number;
  facetSort?: string;
  fieldList?: string;
  filters: IFilters;
  group?: boolean;
  groupField?: string;
  isHighlighted: boolean;
  searchFields: ISearchField[];
  sortFields: ISortField[];
  start: number;
  size: number;
  stringInput: string;
  suggest?: boolean;
  suggestDictionary?: string;
  typeDef: string;
  url: string;
}

export interface IState {
  config: IConfig;
  query: ISolrQuery;
  response: IResponse;
  suggestions: ISuggestions;
}

export type Succ = any;

export interface ISuggestions {
  error?: any;
  suggester: any;
  terms?: string[];
  updating?: boolean;
  url: string;
}



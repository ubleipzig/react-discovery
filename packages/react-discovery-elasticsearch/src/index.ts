import {ISearchField, ISortField} from "@react-discovery/configuration"

export interface IAggregation {
  buckets: IBucket[];
}

export interface IAggregations {
  [field: string]: IAggregation;
}

export interface IBucket extends IAggregation {
  key: string;
  docCount: number;
}

export interface IFetchElasticSearchResponseParams {
  json: string;
  url: string;
}

export interface IHitComponent {
  key: string;
  hitComponent: string;
  defaultOption?: boolean;
  expandedView?: boolean;
}

export interface IHits {
  hits: IHit[];
  numFound: number;
}

export interface IHit {
  id: string;
  _source: any;
  highlighting: any;
}

export interface IQuery {
  query?: any;
  searchFields: ISearchField[];
  size: number;
  sortFields: ISortField[];
  stringInput: string;
}

export interface IResponse {
  aggregations: IAggregations;
  error?: {};
  hits: IHits;
  updating?: boolean;
  url: string;
}

export type Succ = any;

export * from './components'
export * from './enum'
export * from './hooks'
export * from './state'

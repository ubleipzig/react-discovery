export * from './elasticsearch'
export * from './hooks'
export * from './solr'

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

export interface IHits {
  hits: IHit[];
  numFound: number;
}

export interface IHit {
  id?: string;
  _source: any;
  highlighting: any;
}

export interface IResponse {
  aggregations: IAggregations;
  error?: {};
  hits: IHits;
  updating?: boolean;
  url: string;
}

export type Succ = any;

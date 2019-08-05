import {IConfig} from "@react-discovery/configuration"

export * from './elasticsearch'
export * from './hooks'

export interface IAggregation {
  buckets: IBucket[];
}

export interface IAggregations {
  [field: string]: IAggregation;
}

export interface IBucket {
  key: string;
  docCount: number;
}

export interface IHits {
  hits: IHit[];
  total?: {
    value: number;
  };
  numFound: number;
}

export interface IHit {
  id?: string;
  _id?: string;
  _source: any;
  highlight?: any;
  highlighting?: any;
  innerHits?: any;
}

export type IInnerHitField = Record<string, IHits>

export interface IInnerHits {
  "inner_hits": IInnerHitField;
}

export type IDocument = Record<string, IHit>

export interface IResponse {
  aggregations: IAggregations;
  docs?: IDocument;
  error?: {};
  hits: IHits;
  updating?: boolean;
  url: string;
}

export type Succ = any;

export interface IState {
  config: IConfig;
  query: any;
  response: IResponse;
}

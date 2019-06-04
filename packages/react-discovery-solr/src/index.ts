export * from './components'
export * from './hooks'
export * from './query-builders'
export * from './state'

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

export interface IFetchSolrResponseParams {
  requestURI: string;}

export interface IFilters {
  [field: string]: string[];
}

export interface IHits {
  hits: IHit[];
  numFound: number;
}

export interface IHit {
  _source: any;
  highlighting: any;
}

export interface IHitComponent {
  key: string;
  title: string;
  hitComponent: string;
  defaultOption?: boolean;
  expandedView?: boolean;
}

export interface ILanguage {
  label: string;
  locale: string;
}

export interface IQuery {
  facetLimit?: number;
  facetSort?: string;
  fieldList?: string;
  filters: IFilters;
  group?: boolean;
  groupField?: string;
  highlighting: boolean;
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

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IResponse {
  aggregations: IAggregations;
  hits: IHits;
}

export interface ISearchField {
  field: string;
  isChild?: boolean;
  label: string;
  type: string;
}

export interface ISortField {
  field: string;
  label: string;
  order: string;
  isSelected?: boolean;
}

export type Succ = any;




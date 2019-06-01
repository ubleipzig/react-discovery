export * from './SolrResponseProvider'
export * from './queryBuilder'
export * from './SolrParameters'
export * from './suggestQueryBuilder'

export interface IAggregation {
  buckets: IBucket[];
}

export interface IBucket extends IAggregation {
  key: string;
  docCount: number;
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

export interface ISearchField {
  field: string;
  label: string;
  type: string;
}

export interface ISortField {
  field: string;
  label: string;
  order: string;
  isSelected?: boolean;
}

export interface IFilters {
  [field: string]: string[];
}

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IQuery {
  fieldList?: string;
  filters: IFilters;
  highlighting: boolean;
  searchFields: ISearchField[];
  sortFields: ISortField[];
  url: string;
  start: number;
  size: number;
  stringInput: string;
  suggest?: boolean;
  suggestDictionary?: string;
  typeDef: string;
}

export interface IEMaxQuery {
  facetLimit?: number;
  facetSort?: string;
  fieldList?: string;
  filters: {};
  group?: boolean;
  groupField?: string;
  highlighting?: boolean;
  searchFields: ISearchField[];
  size: number;
  sortFields: ISortField[];
  start: number;
  stringInput: string;
  typeDef: string;
  url: string;
}

export * from './SolrResponseProvider'
export * from './extendedDisMaxQueryBuilder'

export interface ISearchField {
  field: string;
  label: string;
  type: string;
}

export interface ISortField {
  field: string;
  label: string;
}

export interface IQuery {
  filters: string[];
  searchFields: ISearchField[];
  sortFields: ISortField[];
  url: string;
  start: number;
  size: number;
  stringInput: string;
  typeDef: string;
}

export interface IEMaxQuery {
  highlighting?: boolean;
  searchFields: ISearchField[];
  sortFields: ISortField[];
  url: string;
  start: number;
  size: number;
  stringInput: string;
  typeDef: string;
  facetLimit?: number;
  facetSort?: string;
  filters: string[];
  group?: boolean;
  groupField?: string;
  hl?: boolean;
}

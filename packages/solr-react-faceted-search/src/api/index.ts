export * from './SolrResponseProvider'
export * from './extendedDisMaxQueryBuilder'
export * from './suggestQueryBuilder'

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

export interface IQuery {
  filters: string[];
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
}

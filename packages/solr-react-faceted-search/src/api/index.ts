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
  fieldList?: string;
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

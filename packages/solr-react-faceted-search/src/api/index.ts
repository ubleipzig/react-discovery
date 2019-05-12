export * from './solr-query';
export * from './SolrResponseProvider'

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
  searchFields: ISearchField[];
  sortFields: ISortField[];
  url: string;
  start: number;
  rows: number;
  stringInput: string;
  typeDef: string;
}

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

export interface IConfig {
  currentCollection?: string;
  currentLanguage?: string;
  collections: {
    [collection: string]: {
      docTypes?: IDocType[];
      hitComponents: IHitComponent[];
      initialFilter?: IFilters;
      refinementListFilters: IRefinementListFilters;
      searchFields: ISearchField[];
      sortFields: ISortField[];
      url: string;
    };
  };
  isHighlighted?: boolean;
  isPersisted?: boolean;
  languages?: ILanguage[];
  isViewExpanded?: boolean;
  selectedIndex?: number;
}

export interface IDocType {
  key: string;
  label: string;
}
export interface IFetchSolrResponseParams {
  requestURI: string;
  url?: string;
}

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

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IRefinementListFilters {
  [id: string]: IRefinementListFilter;
}

export interface IResponse {
  aggregations: IAggregations;
  error?: {};
  grouped?: any;
  hits: IHits;
  updating?: boolean;
  url: string;
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

export interface IState {
  config: IConfig;
  query: IQuery;
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



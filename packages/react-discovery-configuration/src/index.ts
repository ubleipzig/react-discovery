export * from './state'
export interface IConfig {
  currentCollection?: string;
  currentLanguage?: string;
  collections: {
    [collection: string]: {
      docTypes?: IDocType[];
      hitComponents: IHitComponent[];
      initialFilter?: IFilters;
      primaryTypeField: string;
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
  rootContext?: string;
  selectedIndex?: number;
  url?: string;
}

export interface IDocType {
  groupField?: string;
  key: string;
  label: string;
}

export interface IFilters {
  [field: string]: string[];
}

export interface IHitComponent {
  key: string;
  hitComponent: string;
  defaultOption?: boolean;
  expandedView?: boolean;
}

export interface ILanguage {
  label: string;
  locale: string;
}

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IRefinementListFilters {
  [id: string]: IRefinementListFilter;
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

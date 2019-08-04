export * from './state'

export interface ICollection {
  docTypes?: IDocType[];
  hitComponents: IHitComponent[];
  initialFilter?: IFilters;
  name: string;
  primaryTypeField: string;
  refinementListFilters: IRefinementListFilters;
  searchFields: ISearchField[];
  sortFields: ISortField[];
}

export type ICollectionRecord = Record<string, ICollection>

export interface IConfig {
  currentCollection?: string;
  currentLanguage?: string;
  collections: ICollectionRecord;
  itemViews?: IItemViews;
  isHighlighted?: boolean;
  isPersisted?: boolean;
  languages?: ILanguage[];
  isViewExpanded?: boolean;
  rootContext?: string;
  selectedIndex?: number;
  url?: string;
}

export type IItemViews = Record<string, string>

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
  filteredFields?: string[];
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
  isGrandchild?: boolean;
  label: string;
  type: string;
}

export interface ISortField {
  field: string;
  label: string;
  order: string;
  isSelected?: boolean;
}

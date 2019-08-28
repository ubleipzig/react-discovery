export * from './state'

export interface ICollection {
  docTypes?: IDocType[];
  hitComponents: IHitComponent[];
  initialFilter?: IFilters;
  logo?: string;
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
  rootContext?: string;
  selectedIndex?: number;
  url?: string;
  viewType?: string;
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
  filteredFields?: string[];
  hitComponent: string;
  defaultOption?: boolean;
  expandedView?: boolean;
  type: string;
}

export interface ILanguage {
  label: string;
  locale: string;
}

export interface IRefinementListFilter {
  label: string;
  field: string;
  size: number;
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

export interface IUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email?: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber?: string;
}

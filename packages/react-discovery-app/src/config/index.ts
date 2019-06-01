import {
  IRefinementListFilter,
  ISearchField,
  ISortField
} from '@react-discovery/solr'
import {hsp, nested, test01} from './collections'
import deepmerge from 'deepmerge'

export interface IHitComponent {
  defaultOption?: boolean;
  expandedView?: boolean;
  hitComponent: string;
  key: string;
  title: string;
}

export interface IFilter {
  [field: string]: string[];
}

export interface ILanguage {
  label: string;
  locale: string;
}

export interface IConfig {
  currentCollection?: string;
  currentLanguage?: string;
  collections: {
    [collection: string]: {
      docTypes?: string[];
      hitComponents: IHitComponent[];
      initialFilter?: IFilter;
      refinementListFilters: {
        [id: string]: IRefinementListFilter;
      };
      searchFields: ISearchField[];
      sortFields: ISortField[];
      url: string;
    };
  };
  highlighting?: boolean;
  languages?: ILanguage[];
  isViewExpanded?: boolean;
  selectedIndex?: number;
}

export const collections = deepmerge.all([hsp, nested, test01])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "test01"

export const rootConfig: IConfig = {
  collections: null,
  currentCollection,
  currentLanguage: 'de',
  isViewExpanded: false,
  languages: [
    {
      label: 'Deutsch',
      locale: 'de',
    },
    {
      label: 'English',
      locale: 'en',
    }],
  selectedIndex: 0
}

export const localConfig: any = deepmerge(rootConfig, collections)

import deepmerge from 'deepmerge'
import {hsp, nested, test01} from './collections'
import {
  ISearchField,
  ISortField
} from 'solr-react-faceted-search'

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IHitComponent {
  defaultOption?: boolean;
  hitComponent: string;
  key: string;
  title: string;
}

export interface IConfig {
  currentCollection?: string;
  collections: {
    [collection: string]: {
      hitComponents: IHitComponent[];
      refinementListFilters: {
        [id: string]: IRefinementListFilter;
      };
      searchFields: ISearchField[];
      sortFields: ISortField[];
      url: string;
    };
  };
  highlighting?: boolean;
}

export const collections = deepmerge.all([hsp, nested, test01])
const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "test01"

export const rootConfig: IConfig = {
  collections: null,
  currentCollection,
}

export const localConfig: any = deepmerge(rootConfig, collections)

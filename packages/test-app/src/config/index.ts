import deepmerge from 'deepmerge'
import {collections} from './collections'

export interface ISearchField {
  label: string;
  field: string;
  type: string;
}

export interface ISortField {
  label: string;
  field: string;
}

export interface IRefinementListFilter {
  label: string;
  field: string;
}

export interface IConfig {
  currentCollection?: string;
  collections: {
    [collection: string]: {
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

const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "gettingstarted"
export const rootConfig: IConfig = {
  currentCollection,
  collections: null,
  highlighting: true
}

export const localConfig: any = deepmerge(rootConfig, collections)

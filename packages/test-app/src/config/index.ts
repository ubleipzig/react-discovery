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

export interface IConfig {
  currentCollection?: string;
  collections: {
    [collection: string]: {
      searchFields: ISearchField[];
      sortFields: ISortField[];
      url: string;
    };
  };
}

export const rootConfig: IConfig = {
  currentCollection: process.env.REACT_APP_SEARCH_API_COLLECTION || "gettingstarted",
  collections: null
}

export const localConfig: any = deepmerge(rootConfig, collections)

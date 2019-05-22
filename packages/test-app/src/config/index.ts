import deepmerge from 'deepmerge'
import {collections} from './collections'
import {
  ISearchField,
  ISortField
} from 'solr-react-faceted-search'

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

const currentCollection = process.env.REACT_APP_SEARCH_API_COLLECTION || "test01"

export const rootConfig: IConfig = {
  collections: null,
  currentCollection,
}

export const localConfig: any = deepmerge(rootConfig, collections)

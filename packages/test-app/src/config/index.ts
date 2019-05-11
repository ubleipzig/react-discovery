export * from './gettingstarted'

export interface ISearchField {
  label: string
  field: string
  type: string
}

export interface ISortField {
  label: string
  field: string
}

export interface IConfig {
  searchFields: ISearchField[]
  sortFields: ISortField[]
  url: string
}

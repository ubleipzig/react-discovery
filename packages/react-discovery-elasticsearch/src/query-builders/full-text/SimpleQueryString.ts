const assign = require("lodash/assign")

export interface ISimpleQueryString {
  analyzer?: string;
  fields?: string[];
  default_operator?: string;
  flags?: string;
  [str: string]: any;
}

export const SimpleQueryString = (query, options: ISimpleQueryString = {}) => {
  if (!query) {
    return
  }
  return {
    "simple_query_string": assign({query}, options)
  }
}

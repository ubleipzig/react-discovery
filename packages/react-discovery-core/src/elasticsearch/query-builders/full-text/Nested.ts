const assign = require("lodash/assign")

export interface INestedQuery {
  analyzer?: string;
  fields?: string[];
  default_operator?: string;
  flags?: string;
  [str: string]: any;
}

export const Nested = (query) => {
  if (!query) {
    return
  }
  return {
    "query": {
      "bool": {
        "must": [
          {"nested": {
            "inner_hits": {
              "highlight": {
                "fields": {
                  "*": {}
                }
              }
            },
            "path": "entities",
            "query": {
              "simple_query_string": {
                "default_operator": "and",
                "fields": ["entities.beschreibungTitle_t"],
                query
              }
            }
          }},
          {"nested": {
            "inner_hits": {
              "highlight": {
                "fields": {
                  "*": {}
                }
              }
            },
            "path": "entities.entities",
            "query": {
              "simple_query_string": {
                "default_operator": "and",
                "fields": ["entities.entities.beschreibungFaszikelText_t"],
                query
              }
            }
          }}
        ]
      }
    }
  }
}

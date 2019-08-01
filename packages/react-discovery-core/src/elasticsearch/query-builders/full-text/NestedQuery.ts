export interface INestedQuery {
  analyzer?: string;
  fields?: string[];
  default_operator?: string;
  flags?: string;
  [str: string]: any;
}

export const NestedQuery = (aggregations, lvl2QfList, nestedQfList, postFilters, qfList, sort, stringInput) => {
  if (!stringInput) {
    return {
      "aggs": aggregations,
      "query": {
        "bool": {
          "filter": postFilters,
        }
      },
      ...sort,
    }
  }

  return {
    "aggs": aggregations,
    "highlight": {
      "fields": {
        "*": {}
      }
    },
    "query": {
      "bool": {
        "filter": postFilters,
        "should": [
          {
            "simple_query_string": {
              "default_operator": "and",
              "fields": qfList,
              "query": stringInput
            }
          },
          {
            "nested": {
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
                  "fields": nestedQfList,
                  "query": stringInput
                }
              }
            }
          },
          {
            "nested": {
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
                  "fields": lvl2QfList,
                  "query": stringInput
                }
              }
            }
          }
        ]
      }
    },
    ...sort,
  }
}

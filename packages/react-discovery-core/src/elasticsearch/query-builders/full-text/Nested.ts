export interface INestedQuery {
  analyzer?: string;
  fields?: string[];
  default_operator?: string;
  flags?: string;
  [str: string]: any;
}

export const Nested = (lvl2QfList, nestedQfList, qfList, stringInput) => {
  if (!stringInput) {
    return
  }
  return {
    "highlight": {
      "fields": {
        "*": {}
      }
    },
    "query": {
      "bool": {
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
    }
  }
}

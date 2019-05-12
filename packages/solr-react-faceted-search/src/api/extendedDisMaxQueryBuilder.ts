import {IEMaxQuery} from "."
import {SolrParameters} from "./SolrParameters"

export const buildDisMaxQuery = (searchFields, stringInput): string => {
  const mainParam = "q"
  const qfList = searchFields.map((searchField) => {
    return searchField.field
  }).join(" ")
  if (stringInput) {
    return `${SolrParameters.TYPE_DEF}=edismax&${mainParam}=${stringInput}&${SolrParameters.QF}=${qfList}`
  } else {
    return `${SolrParameters.TYPE_DEF}=edismax&${mainParam}=*&${SolrParameters.QF}=${qfList}`
  }
}

export const buildFacetFields = (fields): string => fields
  .filter((field) => field.type === "list-facet" || field.type === "range-facet")
  .map((field) => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.field)}`)
  .concat(
    fields
      .filter((field) => field.type === "period-range-facet")
      .map((field) => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.lowerBound)}` +
      `&${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.upperBound)}`)
  )
  .join("&");

export const buildFacetSort = (fields): string => fields
  .filter((field) => field.facetSort)
  .map((field) => `f.${encodeURIComponent(field.field)}.${SolrParameters.FACET_SORT}=${field.facetSort}`)
  .join("&");

export const buildSort = (sortFields): string => sortFields
  .filter((sortField) => sortField.value)
  .map((sortField) => encodeURIComponent(`${sortField.field} ${sortField.value}`))
  .join(",");

export const buildHighlight = (highlight): string => {
  let hlQs = "";
  // If highlight is set, then populate params from keys/values.
  if (highlight !== null && typeof highlight === "object") {
    let hlParams = `${SolrParameters.HL}=${true}`;
    for (const key of Object.keys(highlight)) {
      // Support nested objects like hl.simple.tags
      if (typeof highlight[key] === "object") {
        for (const nestedKey of Object.keys(highlight[key])) {
          hlParams += `&${SolrParameters.HL}.${key}.${nestedKey}=${encodeURIComponent(highlight[key][nestedKey])}`;
        }
      } else {
        hlParams += `&${SolrParameters.HL}.${key}=${encodeURIComponent(highlight[key])}`;
      }
    }
    hlQs = hlParams;
  }
  return hlQs;
};

export const extendedDisMaxQueryBuilder = (props: IEMaxQuery): string => {
  const {searchFields, sortFields, stringInput, size, start, facetLimit,
    facetSort, group, groupField, hl, url} = props
  const mainQuery = buildDisMaxQuery(searchFields, stringInput)
  const facetFieldParam = buildFacetFields(searchFields)
  const facetSortParams = buildFacetSort(searchFields)
  const facetLimitParam = `${SolrParameters.FACET_LIMIT}=${facetLimit || -1}`
  const facetSortParam = `${SolrParameters.FACET_SORT}${facetSort || "index"}`
  const sortParam = buildSort(sortFields)
  const groupParam = groupField ? `${SolrParameters.GROUP}$=${group}&${SolrParameters.GROUP_FIELD}$=${encodeURIComponent(groupField)}` : ""
  const highlightParam = buildHighlight(hl)
  const queryString = mainQuery +
    `${sortParam.length > 0 ? `&${SolrParameters.SORT}=${sortParam}` : ""}` +
    `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}` +
    `${facetSortParams.length > 0 ? `&${facetSortParams}` : ""}` +
    `${groupParam.length > 0 ? `&${groupParam}` : ""}` +
    `&${SolrParameters.ROWS}=${size}` +
    `&${facetLimitParam}` +
    `&${facetSortParam}` +
    `&${SolrParameters.START}=${start}` +
    `&${SolrParameters.FACET}=${true}` +
    (highlightParam === "" ? "" : `&${highlightParam}`)
  return `${url}?${queryString}`
}


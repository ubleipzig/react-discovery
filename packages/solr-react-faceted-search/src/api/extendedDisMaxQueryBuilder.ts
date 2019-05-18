import {IEMaxQuery} from "."
import {SolrParameters} from "./SolrParameters"

export const buildDisMaxQuery = (searchFields, stringInput): string => {
  const qfList = searchFields.map((searchField): string => {
    return searchField.field
  }).join(" ")
  if (stringInput) {
    return `${SolrParameters.TYPE_DEF}=edismax`
    + `&${SolrParameters.QUERY}=${encodeURIComponent(stringInput)}`
    + `&${SolrParameters.QF}=${qfList}`
  } else {
    return `${SolrParameters.TYPE_DEF}=edismax`
    + `&${SolrParameters.QUERY}=*`
    + `&${SolrParameters.QF}=${qfList}`
  }
}

export const buildFacetFields = (fields): string => fields
  .filter((field): boolean => field.type === "list-facet" || field.type === "range-facet")
  .map((field): string => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.field)}`)
  .concat(
    fields
      .filter((field): boolean => field.type === "period-range-facet")
      .map((field): string => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.lowerBound)}` +
      `&${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.upperBound)}`)
  )
  .join('&');

export const buildFilterQuery = (filters): string => Object.entries(filters)
  .map(([k, values]): string => (values as [])
    .map((val): string => `${SolrParameters.FILTER_QUERY}=${k}:"${val}"`)
    .join('&')).join('&')

export const buildSort = (sortFields): string => sortFields
  .filter((sortField): boolean => sortField.isSelected)
  .map((sortField): string => encodeURIComponent(`${sortField.field} ${sortField.order}`))
  .join(",");

export const buildHighlighting = (highlighting): string => {
  if (highlighting) {
    return `${SolrParameters.HL}=${true}&${SolrParameters.HL_FIELDS}=*`;
  }
};

export const extendedDisMaxQueryBuilder = (props: IEMaxQuery): string => {
  const {facetLimit, facetSort, filters, group, groupField, highlighting,
    searchFields, sortFields, stringInput, size, start, url} = props
  const mainQuery = buildDisMaxQuery(searchFields, stringInput)
  const facetFieldParam = buildFacetFields(searchFields)
  const filterQueryParams = buildFilterQuery(filters)
  const facetLimitParam = `${SolrParameters.FACET_LIMIT}=${facetLimit || -1}`
  const facetSortParam = `${SolrParameters.FACET_SORT}=${facetSort || "index"}`
  const sortParam = buildSort(sortFields)
  const groupParam = groupField ? `${SolrParameters.GROUP}=${group}`
  + `&${SolrParameters.GROUP_FIELD}=${encodeURIComponent(groupField)}` : ""
  const highlightParam = buildHighlighting(highlighting)
  const queryString = mainQuery
    + `${sortParam.length > 0 ? `&${SolrParameters.SORT}=${sortParam}` : ""}`
    + `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}`
    + `${groupParam.length > 0 ? `&${groupParam}` : ""}`
    + `&${SolrParameters.ROWS}=${size}`
    + `&${facetLimitParam}`
    + `&${facetSortParam}`
    + `&${filterQueryParams}`
    + `&${SolrParameters.START}=${start}`
    + `&${SolrParameters.FACET}=${true}`
    + (highlightParam === "" ? "" : `&${highlightParam}`)
  return `${url}${SolrParameters.QUERY_CONTEXT}?${queryString}`
}

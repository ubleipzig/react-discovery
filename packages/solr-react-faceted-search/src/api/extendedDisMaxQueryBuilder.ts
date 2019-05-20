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

export const buildFacetFieldParams = (fields): string => {
  const ff = fields
    .filter((field): boolean => field.type === "list-facet" || field.type === "range-facet")
    .map((field): string => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.field)}`)
    .concat(
      fields
        .filter((field): boolean => field.type === "period-range-facet")
        .map((field): string => `${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.lowerBound)}` +
          `&${SolrParameters.FACET_FIELD}=${encodeURIComponent(field.upperBound)}`)
    )
    .join('&');
  return ff.length ? `&${ff}` : ""
}

export const buildFilterQueryParams = (filters): string => {
  const qf = Object.entries(filters)
    .map(([k, values]): string => (values as [])
      .map((val): string => `${SolrParameters.FILTER_QUERY}=${k}:"${val}"`)
      .join('&')).join('&')
  return qf.length ? `&${qf}` : ""
}

export const buildFacetSortParams = (facetSort = "index"): string => {
  return `&${SolrParameters.FACET_SORT}=${facetSort}`
}

export const buildFacetLimitParams = (facetLimit = -1): string => {
  return `&${SolrParameters.FACET_LIMIT}=${facetLimit}`
}

export const buildSortParams = (sortFields): string => {
  const sf = sortFields
    .filter((sortField, i): boolean => sortField.isSelected || i === 0)
    .map((sortField): string => encodeURIComponent(`${sortField.field} ${sortField.order}`))
    .join(",");
  return sf.length ? `&${SolrParameters.SORT}=${sf}` : ""
}

export const buildSize = (size: number): string => {
  return `&${SolrParameters.ROWS}=${size}`
}

export const buildGroupFieldParams = (group: boolean, groupField: string): string => {
  return groupField ? `&${SolrParameters.GROUP}=${group}`
    + `&${SolrParameters.GROUP_FIELD}=${encodeURIComponent(groupField)}` : ""
}

export const buildHighlighting = (highlighting): string => {
  return highlighting ? `&${SolrParameters.HL}=${true}&${SolrParameters.HL_FIELDS}=*` : "";
}

export const buildStart = (start: number): string => {
  return `&${SolrParameters.START}=${start}`
}

export const buildIsFaceted = (facet: boolean = true): string => {
  return `&${SolrParameters.FACET}=${facet}`
}

export const extendedDisMaxQueryBuilder = (props: IEMaxQuery): string => {
  const {facetLimit, facetSort, filters, group, groupField, highlighting,
    searchFields, sortFields, stringInput, size, start, url} = props
  const queryString = buildDisMaxQuery(searchFields, stringInput)
    + buildSortParams(sortFields)
    + buildFacetFieldParams(searchFields)
    + buildGroupFieldParams(group, groupField)
    + buildSize(size)
    + buildFacetLimitParams(facetLimit)
    + buildFacetSortParams(facetSort)
    + buildFilterQueryParams(filters)
    + buildStart(start)
    + buildIsFaceted(true)
    + buildHighlighting(highlighting)
  return `${url}${SolrParameters.QUERY_CONTEXT}?${queryString}`
}

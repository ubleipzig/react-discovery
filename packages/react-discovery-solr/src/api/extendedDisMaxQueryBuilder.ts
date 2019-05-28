import {FacetTypes} from "./FacetTypes"
import {IEMaxQuery} from "."
import {SolrParameters} from "./SolrParameters"
const queryString = require('query-string')

const EDISMAX = "edismax"
export const buildDisMaxQuery = (searchFields, stringInput = '*'): {} => {
  const qfList = searchFields.map((searchField): string => {
    return searchField.field
  }).join(" ")
  if (stringInput) {
    return {
      [SolrParameters.TYPE_DEF]: EDISMAX,
      [SolrParameters.QUERY]: stringInput,
      [SolrParameters.QF]: qfList
    }
  } else {
    return {
      [SolrParameters.TYPE_DEF]: EDISMAX,
      [SolrParameters.QUERY]: '*',
      [SolrParameters.QF]: qfList
    }
  }
}

export const buildFacetFieldParams = (fields): any => {
  const ff = fields
    .filter((field): boolean => field.type === FacetTypes.LIST_FACET || field.type === FacetTypes.RANGE_FACET)
    .map((field): any => field.field)
  return fields.length ? {[SolrParameters.FACET_FIELD]: ff} : ""
}

export const buildFilterQueryParams = (filters): any => {
  const qf = Object.entries(filters)
    .filter(([ {}, values]: any): boolean => values.length > 0)
    .map(([k, values]): any => (values as [])
      .map((val): string => `${k}:"${val}"`))
  const flattened = [].concat(...qf)
  return flattened.length ? {[SolrParameters.FILTER_QUERY]: flattened} : ""
}

export const buildFacetSortParams = (facetSort = "index"): any => {
  return {[SolrParameters.FACET_SORT]: facetSort}
}

export const buildFacetLimitParams = (facetLimit = -1): any => {
  return {[SolrParameters.FACET_LIMIT]: facetLimit}
}

export const buildFieldListParams = (fieldList = "*, [child]"): any => {
  return {[SolrParameters.FIELD_LIST]: fieldList}
}

export const buildSortParams = (sortFields): any => {
  const sf = sortFields
    .filter((sortField, i): boolean => sortField.isSelected || i === 0)
    .map((sortField): string => `${sortField.field} ${sortField.order}`)
    .join(",");
  return sf.length ? {[SolrParameters.SORT]: sf} : ""
}

export const buildSize = (size: number): any => {
  return {[SolrParameters.ROWS]: size}
}

export const buildGroupFieldParams = (group: boolean, groupField: string): any => {
  return groupField ? {
    [SolrParameters.GROUP]: group,
    [SolrParameters.GROUP_FIELD]: groupField} : ""
}

export const buildHighlighting = (highlighting): any => {
  return highlighting ? {
    [SolrParameters.HL]: true,
    [SolrParameters.HL_FIELDS]: '*'} : "";
}

export const buildStart = (start: number): any => {
  return {[SolrParameters.START]: start}
}

export const buildIsFaceted = (facet: boolean = true): any => {
  return {[SolrParameters.FACET]: facet}
}

export const extendedDisMaxQueryBuilder = (props: IEMaxQuery): string => {
  const {facetLimit, facetSort, fieldList, filters, group, groupField, highlighting,
    searchFields, sortFields, stringInput, size, start, url} = props
  const qs = {
    ...buildDisMaxQuery(searchFields, stringInput),
    ...buildSortParams(sortFields),
    ...buildFacetFieldParams(searchFields),
    ...buildGroupFieldParams(group, groupField),
    ...buildSize(size),
    ...buildFacetLimitParams(facetLimit),
    ...buildFacetSortParams(facetSort),
    ...buildFilterQueryParams(filters),
    ...buildStart(start),
    ...buildIsFaceted(true),
    ...buildHighlighting(highlighting),
    ...buildFieldListParams(fieldList)}
  return `${url}${SolrParameters.QUERY_CONTEXT}?${queryString.stringify(qs)}`
}

import {FacetTypes} from "./FacetTypes"
import {IEMaxQuery} from "."
import {SolrParameters} from "./SolrParameters"
const queryString = require('query-string')

export const buildQueryFieldParams = (typeDef: string, searchFields): any => {
  if (typeDef === SolrParameters.EDISMAX) {
    const qfList = searchFields.map((searchField): string => {
      return searchField.field
    }).join(" ")
    return {[SolrParameters.QF]: qfList}
  } else {
    return ""
  }
}

export const buildStringInputParams = (typeDef: string, stringInput): {} => {
  if (!stringInput && typeDef === SolrParameters.EDISMAX) {
    return {
      [SolrParameters.QUERY]: '*',
    }
  } else if (!stringInput && typeDef === SolrParameters.LUCENE) {
    return {
      [SolrParameters.QUERY]: '*:*',
    }
  } else {
    return {
      [SolrParameters.QUERY]: stringInput,
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

export const buildTypeDefParams = (typeDef: string): any => {
  return {
    [SolrParameters.TYPE_DEF]: typeDef
  }
}

export const buildIsFaceted = (facet: boolean = true): any => {
  return {[SolrParameters.FACET]: facet}
}

export const queryBuilder = (props: IEMaxQuery): string => {
  const {facetLimit, facetSort, fieldList, filters, group, groupField, highlighting,
    searchFields, sortFields, stringInput, size, start, typeDef, url} = props
  const qs = {
    ...buildQueryFieldParams(typeDef, searchFields),
    ...buildStringInputParams(typeDef, stringInput),
    ...buildTypeDefParams(typeDef),
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

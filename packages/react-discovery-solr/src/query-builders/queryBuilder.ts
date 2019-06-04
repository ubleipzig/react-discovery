import {IFilters, IQuery, ISearchField, ISortField} from ".."
import {FacetTypes} from "./FacetTypes"
import {SolrParameters} from "./SolrParameters"
const queryString = require('query-string')

export const buildQueryFieldParams = (typeDef: string, searchFields: ISearchField[]): {} => {
  if (typeDef === SolrParameters.EDISMAX) {
    const qfList = searchFields.map((searchField): string => {
      return searchField.field
    }).join(" ")
    return {[SolrParameters.QF]: qfList}
  } else {
    return ""
  }
}

export const buildStringInputParams = (typeDef: string, stringInput: string, searchFields: ISearchField[]): {} => {
  if (!stringInput && typeDef === SolrParameters.EDISMAX) {
    return {
      [SolrParameters.QUERY]: '*',
    }
  } else if (!stringInput && typeDef === SolrParameters.LUCENE) {
    return {
      [SolrParameters.QUERY]: '*:*',
    }
  } else if (stringInput && typeDef === SolrParameters.LUCENE) {
    const replaced = stringInput.replace(/\s/g, "+")
    const parentQfList = searchFields
      .filter((field: any): boolean => !("isChild" in field)
        && (field.field.includes('_s')
      || field.field.includes('_ss') || field.field.includes('_t')))
      .map((searchField): string => {
        return searchField.field
      })
      .join(`:${replaced} || `)
    const childQfList = `{!parent which='-_nest_path_:* *:*'}${searchFields
      .filter((field: any): boolean =>
        field.isChild === true && (field.field.includes('_s')
      || field.field.includes('_ss')
      || field.field.includes('_t')))
      .map((searchField): string => { return searchField.field })
      .join(`:${replaced} || {!parent which='-_nest_path_:* *:*'}`)}`
    const q = `${parentQfList}:${replaced} || ${childQfList}:${replaced}`
    return {
      [SolrParameters.QUERY]: q,
    }
  } else {
    return {
      [SolrParameters.QUERY]: stringInput,
    }
  }
}

export const buildFacetFieldParams = (fields: ISearchField[]): {} => {
  const ff = fields
    .filter((field): boolean => field.type === FacetTypes.LIST_FACET || field.type === FacetTypes.RANGE_FACET)
    .map((field): string => field.field)
  return fields.length ? {[SolrParameters.FACET_FIELD]: ff} : ""
}

export const buildFilterQueryParams = (filters: IFilters): {} => {
  const qf = Object.entries(filters)
    .filter(([{}, values]: [string, string[]]): boolean => values.length > 0)
    .map(([k, values]): string[] => (values)
      .map((val): string => `${k}:"${val}"`))
  const flattened = [].concat(...qf)
  return flattened.length ? {[SolrParameters.FILTER_QUERY]: flattened} : ""
}

export const buildFacetSortParams = (facetSort = "index"): {} => {
  return {[SolrParameters.FACET_SORT]: facetSort}
}

export const buildFacetLimitParams = (facetLimit = -1): {} => {
  return {[SolrParameters.FACET_LIMIT]: facetLimit}
}

export const buildFieldListParams = (fieldList = "*, [child]"): {} => {
  return {[SolrParameters.FIELD_LIST]: fieldList}
}

export const buildSortParams = (sortFields: ISortField[]): {} => {
  const sf = sortFields
    .filter((sortField, i): boolean => sortField.isSelected || i === 0)
    .map((sortField): string => `${sortField.field} ${sortField.order}`)
    .join(",");
  return sf.length ? {[SolrParameters.SORT]: sf} : ""
}

export const buildSize = (size: number): {} => {
  return {[SolrParameters.ROWS]: size}
}

export const buildGroupFieldParams = (group: boolean, groupField: string): {} => {
  return groupField ? {
    [SolrParameters.GROUP]: group,
    [SolrParameters.GROUP_FIELD]: groupField} : ""
}

export const buildHighlighting = (highlighting: boolean): {} => {
  return highlighting ? {
    [SolrParameters.HL]: true,
    [SolrParameters.HL_FIELDS]: '*'} : "";
}

export const buildStart = (start: number): {} => {
  return {[SolrParameters.START]: start}
}

export const buildTypeDefParams = (typeDef: string): {} => {
  return {[SolrParameters.TYPE_DEF]: typeDef}
}

export const buildIsFaceted = (facet: boolean = true): {} => {
  return {[SolrParameters.FACET]: facet}
}

export const queryBuilder = (props: IQuery): string => {
  const {facetLimit, facetSort, fieldList, filters, group, groupField, highlighting,
    searchFields, sortFields, stringInput, size, start, typeDef, url} = props
  const qs = {
    ...buildQueryFieldParams(typeDef, searchFields),
    ...buildStringInputParams(typeDef, stringInput, searchFields),
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

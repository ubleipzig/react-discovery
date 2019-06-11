import {IFilters, IQuery, ISearchField, ISortField} from ".."
import {FacetTypes} from "./FacetTypes"
import {SolrParameters} from "./SolrParameters"
import {stringify} from 'query-string'

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

const buildIsTextOrStringField = (field): boolean => {
  return !(field.field.includes('_dt') || field.field.includes('_i'))
}

export const buildStringInputParams = (typeDef: string, stringInput: string, searchFields: ISearchField[]): {} => {
  if (!stringInput) {
    if (typeDef === SolrParameters.EDISMAX) {
      return {
        [SolrParameters.QUERY]: '*',
      }
    } else if (typeDef === SolrParameters.LUCENE) {
      return {
        [SolrParameters.QUERY]: '*:*',
      }
    }
  } else {
    if (typeDef === SolrParameters.LUCENE) {
      const replaced = stringInput.replace(/\s/g, "+")
      const parentQfList = searchFields
        .filter((field: any): boolean => !("isChild" in field))
        .filter(buildIsTextOrStringField)
        .map((searchField): string => {
          return searchField.field
        })
        .join(`:${replaced} || `)
      const childQfList = `${SolrParameters.BLOCK_JOIN_PARENT_PATH}${searchFields
        .filter((field: any): boolean => field.isChild === true)
        .filter(buildIsTextOrStringField)
        .map((searchField): string => {
          return searchField.field
        })
        .join(`:${replaced} || ${SolrParameters.BLOCK_JOIN_PARENT_PATH}`)}`
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
}

export const buildFacetFieldParams = (fields: ISearchField[]): {} => {
  const ff = fields
    .filter((field): boolean => field.type === FacetTypes.LIST_FACET || field.type === FacetTypes.RANGE_FACET)
    .map((field): string => field.field)
  return fields.length ? {[SolrParameters.FACET_FIELD]: ff} : ""
}

export const buildFacetSortParams = (facetSort = "count"): {} => {
  return {[SolrParameters.FACET_SORT]: facetSort}
}

export const buildFacetLimitParams = (facetLimit = -1): {} => {
  return {[SolrParameters.FACET_LIMIT]: facetLimit}
}

export const buildFacetMinCount = (facetMinCount: number = 1): {} => {
  return {[SolrParameters.FACET_MINCOUNT]: facetMinCount}
}

export const buildFieldListParams = (fieldList = "*, [child limit=100]"): {} => {
  return {[SolrParameters.FIELD_LIST]: fieldList}
}

export const buildGroupFieldParams = (group: boolean = true, groupField: string): {} => {
  return groupField ? {
    [SolrParameters.GROUP]: group,
    [SolrParameters.GROUP_FIELD]: groupField} : ""
}

export const buildFilterQueryParams = (filters: IFilters): {} => {
  const qf = Object.entries(filters)
    .filter(([{}, values]: [string, string[]]): boolean => values.length > 0)
    .map(([k, values]): string[] => (values)
      .map((val): string => `${k}:"${val}"`))
  const flattened = [].concat(...qf)
  return flattened.length ? {[SolrParameters.FILTER_QUERY]: flattened} : ""
}

export const buildIsFaceted = (facet: boolean = true): {} => {
  return {[SolrParameters.FACET]: facet}
}

export const buildIsHighlighted = (isHighlighted: boolean = true): {} => {
  return isHighlighted ? {
    [SolrParameters.HL]: isHighlighted,
    [SolrParameters.HL_FIELDS]: '*'} : "";
}

export const buildSize = (size: number): {} => {
  return {[SolrParameters.ROWS]: size}
}

export const buildSortParams = (sortFields: ISortField[]): {} => {
  const sf = sortFields
    .filter((sortField, i): boolean => sortField.isSelected || i === 0)
    .map((sortField): string => `${sortField.field} ${sortField.order}`)
    .join(",");
  return sf.length ? {[SolrParameters.SORT]: sf} : ""
}

export const buildStart = (start: number): {} => {
  return {[SolrParameters.START]: start}
}

export const buildTypeDefParams = (typeDef: string): {} => {
  return {[SolrParameters.TYPE_DEF]: typeDef}
}

export const queryBuilder = (props: IQuery): string => {
  const {facetLimit, facetSort, fieldList, filters, group, groupField, isHighlighted,
    searchFields, sortFields, stringInput, size, start, typeDef, url} = props
  const qs = {
    ...buildFacetFieldParams(searchFields),
    ...buildFacetLimitParams(facetLimit),
    ...buildFacetMinCount(1),
    ...buildFacetSortParams(facetSort),
    ...buildFieldListParams(fieldList),
    ...buildFilterQueryParams(filters),
    ...buildGroupFieldParams(group, groupField),
    ...buildIsFaceted(true),
    ...buildIsHighlighted(isHighlighted),
    ...buildQueryFieldParams(typeDef, searchFields),
    ...buildSortParams(sortFields),
    ...buildSize(size),
    ...buildStart(start),
    ...buildStringInputParams(typeDef, stringInput, searchFields),
    ...buildTypeDefParams(typeDef)}
  return `${url}${SolrParameters.QUERY_CONTEXT}?${stringify(qs)}`
}

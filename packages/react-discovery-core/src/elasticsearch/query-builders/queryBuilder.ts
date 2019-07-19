import {IElasticSearchQuery, IFilters} from "../.."
import {ElasticSearchConstants} from '../enum'
import {NestedQuery} from "./full-text"
const assign = require("lodash/assign")
const reduce = require("lodash/reduce")
const compact = require("lodash/compact")

export const buildSize = (size: number = 10): {} => {
  return {[ElasticSearchConstants.SIZE]: size}
}

export const buildFrom = (from: number): {} => {
  return {[ElasticSearchConstants.FROM]: from}
}

const buildTrackTotal = (): {} => {
  return {[ElasticSearchConstants.TRACK_TOTAL_HITS]: true}
}

const buildIsTextOrStringField = (field): boolean => {
  return !(field.field.includes('_dt') || field.field.includes('_i'))
}

const buildAggsContainer = (key: string, inner, aggsArray: []) => {
  aggsArray = compact(aggsArray)
  if (aggsArray.length > 0) {
    inner.aggs = reduce(aggsArray, assign, {})
  }
  return {
    [key]: inner
  }
}

export const buildTermsBucket = (key, field, ...childAggs: any) => {
  return buildAggsContainer(key, {
    terms: assign({field})
  }, childAggs)
}

export const buildAggs = (refinementListFilters) => {
  return Object.values(refinementListFilters).map((filter: any) => {
    return buildTermsBucket(filter.field, filter.field, null)
  }).reduce((acc, val) => {
    return {...acc, ...val}
  }, {})
}

const buildSearchFieldList = (searchFields) => {
  return searchFields
    .filter((field: any): boolean => !("isChild" in field))
    .filter((field: any): boolean => !("isGrandchild" in field))
    .filter(buildIsTextOrStringField).map((sf) => sf.field)
}

const buildNestedSearchFieldList = (searchFields) => {
  return searchFields
    .filter((field: any): boolean => ("isChild" in field))
    .filter(buildIsTextOrStringField).map((sf) => sf.field)
}

const buildLevel2NestedSearchFieldList = (searchFields) => {
  return searchFields
    .filter((field: any): boolean => ("isGrandchild" in field))
    .filter(buildIsTextOrStringField).map((sf) => sf.field)
}

export const TermQuery = (key, value) => {
  return {term: {[key]: value}}
}

const buildPostFilter = (filters: IFilters) => {
  const tq = Object.entries(filters)
    .filter(([{}, values]: [string, string[]]): boolean => values.length > 0)
    .map(([k, values]): {}[] => (values)
      .map((val): {} => {
        return TermQuery(k, val)
      }))
  return [].concat(...tq)
}

export const queryBuilder = (props: IElasticSearchQuery): any => {
  const {aggs, filters, from, size, searchFields, stringInput} = props
  const qfList = buildSearchFieldList(searchFields)
  const nestedQfList = buildNestedSearchFieldList(searchFields)
  const level2QfList = buildLevel2NestedSearchFieldList(searchFields)
  const postFilter = buildPostFilter(filters)
  return {
    ...buildSize(size),
    ...buildFrom(from),
    ...buildTrackTotal(),
    ...NestedQuery(aggs, level2QfList, nestedQfList, postFilter, qfList, stringInput)}
}

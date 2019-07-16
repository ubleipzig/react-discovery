import {ElasticSearchConstants} from '../enum'
import {IElasticSearchQuery} from "../.."
import {Nested} from "./full-text"

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

export const queryBuilder = (props: IElasticSearchQuery): any => {
  const {from, size, searchFields, stringInput} = props
  const qfList = buildSearchFieldList(searchFields)
  const nestedQfList = buildNestedSearchFieldList(searchFields)
  const level2QfList = buildLevel2NestedSearchFieldList(searchFields)
  return {
    ...buildSize(size),
    ...buildFrom(from),
    ...buildTrackTotal(),
    ...Nested(level2QfList, nestedQfList, qfList, stringInput)}
}

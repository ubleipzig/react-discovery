import {ElasticSearchConstants} from '../enum'
import {IElasticSearchQuery} from "../.."

import {SimpleQueryString} from "./full-text"

export const buildSize = (size: number = 10): {} => {
  return {[ElasticSearchConstants.SIZE]: size}
}

export const buildFrom = (from: number): {} => {
  return {[ElasticSearchConstants.FROM]: from}
}

const buildTrackTotal = (): {} => {
  return {[ElasticSearchConstants.TRACK_TOTAL_HITS]: true}
}

export const queryBuilder = (props: IElasticSearchQuery): any => {
  const {from, size, stringInput} = props
  return {
    ...buildSize(size),
    ...buildFrom(from),
    ...buildTrackTotal(),
    query: SimpleQueryString(stringInput)}
}

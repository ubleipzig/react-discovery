import {ElasticSearchConstants, IQuery} from ".."
import {SimpleQueryString} from "./full-text"

const buildTrackTotal = () => {
  return {[ElasticSearchConstants.TRACK_TOTAL_HITS]: true}
}

export const queryBuilder = (props: IQuery): any => {
  const {stringInput} = props
  return {
    ...buildTrackTotal(),
    query: SimpleQueryString(stringInput)}
}

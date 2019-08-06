import {ESCore} from "@react-discovery/core"

export const buildDocumentUri = (currentCollection, id) => {
  const collection = currentCollection || process.env.REACT_APP_SEARCH_API_COLLECTION
  return process.env.REACT_APP_SEARCH_API_HOST
    + collection
    + ESCore.enums.ElasticSearchConstants.DOCUMENT + id
}

export const getRandomInt = (min, max): string => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min)) + min;
  return randomInt.toString()
}

export const buildRandomUBLThumbnail = (): string => {
  const page = getRandomInt(1, 3).padStart(8, "0")
  const manifestId = getRandomInt(300, 12000).padStart(10, "0")
  const prefix = manifestId.substring(4, 8)
  return `https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/${prefix}/${manifestId}/${page}.jpx/full/170,/0/default.jpg`
}


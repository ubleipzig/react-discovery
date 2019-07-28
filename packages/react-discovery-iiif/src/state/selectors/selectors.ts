import {useSelector} from "react-redux"

export const getImageServices = (manifestId): [] => {
  return useSelector((state: any): any => state.iiif.responses && state.iiif.responses[manifestId]
    && state.iiif.responses[manifestId].imageServices)
}

export const getInApolloRequest = (): any[] => {
  return useSelector((state: any): any[] => state.iiif.apollo)
}

export const getCurrentManifestsInCollection = (): any => {
  return useSelector((state: any): any => state.iiif.collection &&
    Object.values(state.iiif.collection).map((item: any): any => item.manifest))
}



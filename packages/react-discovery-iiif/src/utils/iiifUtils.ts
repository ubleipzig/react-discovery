import {IIIF} from '../enum'

export const buildThumbnailReference = (thumbnail) => {
  let thumbnailLink
  if (thumbnail) {
    if (thumbnail.includes('/full')) {
      thumbnailLink = thumbnail
      // support image api v1 providers (this should not be a long list)
    } else if (thumbnail.includes(IIIF.LEGACY_API_COLLECTIONS)) {
      thumbnailLink = thumbnail + IIIF.THUMBNAIL_NATIVE_API_REQUEST
    } else {
      thumbnailLink = thumbnail + IIIF.THUMBNAIL_API_REQUEST
    }
  } else {
    thumbnailLink = thumbnail
  }
  return thumbnailLink
}

export const buildTileSources = (imageServices): string[] => {
  return imageServices && imageServices.map((s: any): string =>
    `${s.id}/info.json`)
}

export const buildTileSourceForGridViewerImage = (gridViewerImage): string[] => {
  let viewerImage
  if (gridViewerImage.includes('/full')) {
    viewerImage = `${gridViewerImage.split('/full')[0]}/info.json`
  } else {
    viewerImage = `${gridViewerImage}/info.json`
  }
  return viewerImage
}

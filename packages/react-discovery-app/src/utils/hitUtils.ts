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

export const buildHighlightedValueForHit = (field, hit): string => {
  const {_source, highlighting} = hit
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  return [].concat(source[field] || null).filter((v): any => v !== null).join(", ");
}

export const buildDateFormat = (field, hit): string => {
  const {_source, highlighting} = hit
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  const date = source[field] && new Date(source[field])
  return date ? `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}` : null
}

export const buildEntityCountForType = (hit, type): number => {
  return hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type).length
}

export const buildNestedEntityCountForType = (entity, type): number => {
  return entity && entity.entities.filter((entity): boolean => entity.type_s === type).length
}

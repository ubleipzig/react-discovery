import {ESCore} from '@react-discovery/core'

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

export const buildHighlightedValueForHit = (field, hit): string => {
  const {_source} = hit
  const highlighting = hit.highlighting || {}
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  return [].concat(source[field] || null).filter((v): any => v !== null).join(", ")
}

export const buildDateFormat = (field, hit): string => {
  const {_source} = hit
  const highlighting = hit.highlighting || {}
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  const date = source[field] && new Date(source[field])
  return date ? `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}` : null
}

export const buildEntityCountForType = (entities, type): number => {
  return entities && entities.filter((entity): boolean => entity[typeField] === type).length
}

// TODO Abstract nested type matching logic
export const buildInnerHitCountForType = (entities, type): number => {
  if (type === 'Beschreibung' || type === 'Faszikel') {
    const types = ['Beschreibung', 'Faszikel']
    return entities && entities.filter((entity): boolean => types.includes(entity._source[typeField])).length
  } else {
    return entities && entities.filter((entity): boolean => entity._source[typeField] === type).length
  }
}

export const getTypeForId = (hit, id): string => {
  const {_source} = hit
  if (_source.id === id) {
    return _source[typeField]
  }
}

export const getParentEntityByChildIdentifier = (childId, entities) => {
  return entities.filter((entity) => entity.entities.filter((child) => child.id === childId))
}

// TODO determine how to handle manifest field location with different schemas
export const getFirstManifestFromHit = (hit, matchEntityField) => {
  const manifest = hit && hit._source && (hit._source.manifest || hit._source.Manifest)
  if (!manifest) {
    const manifests = hit && hit._source && hit._source.entities
      .filter((entity) => entity[typeField] === matchEntityField)
      .map((digitalisat) => digitalisat.digitalisatManifestId_s)
    return manifests.length && manifests[0]
  }
  return manifest
}

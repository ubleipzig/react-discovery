import {
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields,
  personDisplayFields
} from "./displayFields"
import {Domain} from "./enum"

export const domainEntitySpec = [
  {
    displayFields: digitalisatDisplayFields,
    isNested: false,
    nestedDisplayFields: null,
    type: Domain.MEDIA
  },
  {
    displayFields: beschreibungDisplayFields,
    isNested: true,
    nestedDisplayFields: facetDisplayFields,
    type: Domain.DESCRIPTION
  },
  {
    displayFields: personDisplayFields,
    isNested: false,
    nestedDisplayFields: null,
    type: Domain.PERSON
  },
  {
    displayFields: annotationDisplayFields,
    isNested: false,
    nestedDisplayFields: null,
    type: Domain.ANNOTATION
  },
]

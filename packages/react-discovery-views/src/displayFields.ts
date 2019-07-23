export interface IDisplayField {
  field: string;
  label: string;
}

export const digitalisatDisplayFields = [
  {field: 'digitalisatTitel_t', label: 'title'},
  {field: 'digitalisatDescription_t', label: 'description'},
  {field: 'digitalisatManifestId_s', label: 'manifest'}
]

export const beschreibungDisplayFields = [
  {field: 'beschreibungTitle_t', label: 'title'},
]

export const facetDisplayFields = [
  {field: 'beschreibungFaszikelLabel_t', label: 'facetLabel'},
  {field: 'beschreibungFaszikelText_t', label: 'facetText'},
]

export const annotationDisplayFields = [
  {field: 'annotationTarget_s', label: 'target'},
  {field: 'annotationBody_t', label: 'body'},
]

export const personDisplayFields = [
  {
    field: "personFullname_t",
    label: "personFullName",
  },
  {
    field: "personBirthDate_dt",
    label: "personBirthDate",
  },
  {
    field: "personDeathDate_dt",
    label: "personDeathDate",
  },
  {
    field: "personBirthPlace_t",
    label: "personBirthPlace",
  },
  {
    field: "personDeathPlace_t",
    label: "personDeathPlace",
  },
  {
    field: "personWorkingPlace_t",
    label: "personWorkingPlace",
  },
  {
    field: "personOccupation_t",
    label: "personOccupation",
  },
  {
    field: "personGender_s",
    label: "personGender",
  },
  {
    field: "personAlternateNames_ss",
    label: "personAlternateNames",
  },
  {
    field: "personRole_s",
    label: "personRole",
  },
]

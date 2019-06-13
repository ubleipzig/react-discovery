import {IConfig} from "@react-discovery/solr"

export const test04: IConfig = {
  collections: {
    test04: {
      docTypes: [
        {
          key: '',
          label: 'all'
        },
        {
          key: 'Kulturobjekt',
          label: 'culturalObjects'
        },
        {
          key: 'Beschreibung',
          label: 'descriptions'
        },
        {
          key: 'Digitalisat',
          label: 'digitalisations'
        },
        {
          groupField: 'personFullname_t',
          key: 'Person',
          label: 'persons'
        },
        {
          key: 'Annotation',
          label: 'annotations'
        }
      ],
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "DefaultHitComponent",
          key: "default",
        },
        {
          expandedView: false,
          hitComponent: "Kulturobjekt",
          key: "facet",
        },
        {
          expandedView: false,
          hitComponent: "Beschreibung",
          key: "facet",
        },
        {
          expandedView: false,
          hitComponent: "Digitalisat",
          key: "facet",
        },
        {
          expandedView: true,
          hitComponent: "DigitalisatExpanded",
          key: "facet",
        },
        {
          expandedView: true,
          hitComponent: "KulturobjektExpanded",
          key: "facet",
        },
        {
          expandedView: false,
          hitComponent: "Person",
          key: "facet",
        },
      ],
      initialFilter: {'type_s': ['Kulturobjekt']},
      refinementListFilters: {
        1: {
          field: "entstehungsort_s",
          label: "originPlace",
        },
        2: {
          field: "status_t",
          label: "status",
        },
        3: {
          field: "schreibsprache_t",
          label: "language",
        },
        4: {
          field: "type_s",
          label: "documentType",
        },
      },
      searchFields: [
        {
          field: "id",
          label: "id",
          type: "text"
        },
        {
          field: "type_s",
          label: "type",
          type: "list-facet"
        },
        {
          field: "annotationTarget_s",
          isChild: true,
          label: "annotationTarget",
          type: "text"
        },
        {
          field: "annotationBody_t",
          isChild: true,
          label: "annotationBody",
          type: "text"
        },
        {
          field: "beschreibungText_t",
          isChild: true,
          label: "descriptionText",
          type: "text"
        },
        {
          field: "beschreibungTitle_t",
          isChild: true,
          label: "beschreibungTitle",
          type: "text"
        },
        {
          field: "beschreibungFaszikelLabel_t",
          isChild: true,
          label: "beschreibungFaszikelLabel",
          type: "text"
        },
        {
          field: "beschreibungFaszikelText_t",
          isChild: true,
          label: "beschreibungFaszikelText",
          type: "text"
        },
        {
          field: "digitalisatDescription_t",
          isChild: true,
          label: "digitalisatDescription",
          type: "text"
        },
        {
          field: "digitalisatTitel_t",
          isChild: true,
          label: "digitalisatTitel",
          type: "text"
        },
        {
          field: "digitalisatManifestId_s",
          isChild: true,
          label: "manifest",
          type: "text"
        },
        {
          field: "titel_t",
          label: "Title",
          type: "text"
        },
        {
          field: "subtitel_t",
          label: "Subtitel",
          type: "text"
        },
        {
          field: "author_t",
          label: "author",
          type: "text"
        },
        {
          field: "stoff_t",
          label: "material",
          type: "list-facet"
        },
        {
          field: "blattzahl_i",
          label: "pageCount",
          type: "text"
        },
        {
          field: "format_t",
          label: "format",
          type: "list-facet"
        },
        {
          field: "entstehungsort_s",
          label: "originPlace",
          type: "list-facet"
        },
        {
          field: "entstehungdatum_t",
          label: "originDate",
          type: "text"
        },
        {
          field: "formtyp_t",
          label: "formType",
          type: "text"
        },
        {
          field: "status_t",
          label: "status",
          type: "list-facet"
        },
        {
          field: "schrift_t",
          label: "writingStyle",
          type: "list-facet"
        },
        {
          field: "schreibsprache_t",
          label: "language",
          type: "list-facet"
        },
        {
          field: "vorbesitzer_s",
          label: "previousOwner",
          type: "list-facet"
        },
        {
          field: "personFullname_t",
          isChild: true,
          label: "personFullName",
          type: "list-facet"
        },
        {
          field: "personBirthDate_dt",
          isChild: true,
          label: "personBirthDate",
          type: "range-racet"
        },
        {
          field: "personDeathDate_dt",
          isChild: true,
          label: "personDeathDate",
          type: "range-racet"
        },
        {
          field: "personBirthPlace_t",
          isChild: true,
          label: "personBirthPlace",
          type: "list-facet"
        },
        {
          field: "personDeathPlace_t",
          isChild: true,
          label: "personDeathPlace",
          type: "list-facet"
        },
        {
          field: "personWorkingPlace_t",
          isChild: true,
          label: "personWorkingPlace",
          type: "list-facet"
        },
        {
          field: "personOccupation_t",
          isChild: true,
          label: "personOccupation",
          type: "list-facet"
        },
        {
          field: "personRole_s",
          isChild: true,
          label: "personRole",
          type: "list-facet"
        },
        {
          field: "personGender_s",
          isChild: true,
          label: "personGender",
          type: "list-facet"
        },
        {
          field: "personAlternateNames_ss",
          isChild: true,
          label: "personAlternateNames",
          type: "list-facet"
        },
        {
          field: "_root_",
          label: "root",
          type: "text"
        },
      ],
      sortFields: [
        {
          field: "type_s",
          label: "type",
          order: "asc"
        },
        {
          field: "entstehungsort_s",
          label: "originPlace",
          order: "asc"
        },
        {
          field: "status_t",
          label: "status",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

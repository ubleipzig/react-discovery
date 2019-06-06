import {IConfig} from "@react-discovery/solr"

export const test02: IConfig = {
  collections: {
    test02: {
      docTypes: ['Kulturobjekt', 'Beschreibung', 'Digitalisat', 'Person', 'Werke'],
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "Kulturobjekt",
          key: "facet",
          title: "Kulturobjekt"
        },
        {
          expandedView: false,
          hitComponent: "Beschreibung",
          key: "facet",
          title: "Beschreibung"
        },
        {
          expandedView: false,
          hitComponent: "Digitalisat",
          key: "facet",
          title: "Digitalisat"
        },
        {
          expandedView: true,
          hitComponent: "DigitalisatExpanded",
          key: "facet",
          title: "Digitalisat"
        },
        {
          expandedView: true,
          hitComponent: "KulturobjektExpanded",
          key: "facet",
          title: "Kulturobjekt"
        },
        {
          expandedView: false,
          hitComponent: "Person",
          key: "facet",
          title: "Person"
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
        }
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
          field: "beschreibungText_t",
          isChild: true,
          label: "BeschreibungText",
          type: "text"
        },
        {
          field: "digitalisatDescription_t",
          isChild: true,
          label: "DigitalisatDescription",
          type: "text"
        },
        {
          field: "digitalisatManifestId_s",
          isChild: true,
          label: "Manifest",
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
          field: "vorbesitzer_t",
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
      ],
      sortFields: [
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

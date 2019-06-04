import {IConfig} from "../index"

export const nested: IConfig = {
  collections: {
    nested: {
      docTypes: ['KOD', 'Beschreibung', 'Digitalisat', 'Person', 'Werke'],
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "KOD",
          key: "facet",
          title: "KOD"
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
          hitComponent: "KODExpanded",
          key: "facet",
          title: "KOD"
        }
      ],
      initialFilter: {'type_s': ['KOD']},
      refinementListFilters: {
        1: {
          field: "entstehungsort_s",
          label: "originPlace",
        },
        2: {
          field: "status_s",
          label: "status",
        },
        3: {
          field: "schreibsprache_s",
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
          field: "stoff_ss",
          label: "material",
          type: "list-facet"
        },
        {
          field: "blattzahl_i",
          label: "pageCount",
          type: "list-facet"
        },
        {
          field: "format_ss",
          label: "format",
          type: "list-facet"
        },
        {
          field: "entstehungsort_s",
          label: "originPlace",
          type: "list-facet"
        },
        {
          field: "entstehungdatum_s",
          label: "originDate",
          type: "text"
        },
        {
          field: "formtyp_s",
          label: "formType",
          type: "text"
        },
        {
          field: "status_s",
          label: "status",
          type: "list-facet"
        },
        {
          field: "schrift_s",
          label: "writingStyle",
          type: "list-facet"
        },
        {
          field: "schreibsprache_s",
          label: "language",
          type: "list-facet"
        },
        {
          field: "vorbesitzer_s",
          label: "previousOwner",
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
          field: "status_s",
          label: "status",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

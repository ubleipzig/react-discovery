import {IConfig} from "../index"

export const nested: IConfig = {
  collections: {
    nested: {
      docTypes: ['KOD', 'Beschreibung', 'Digitalisat', 'Person', 'Werke'],
      hitComponents: [
        {
          defaultOption: true,
          hitComponent: "HspDefaultHitComponent",
          key: "list",
          title: "Compact"
        },
        {
          hitComponent: "Beschreibung",
          key: "facet",
          title: "Beschreibung"
        },
        {
          hitComponent: "Digitalisat",
          key: "facet",
          title: "Digitalisat"
        },
        {
          expandedView: true,
          hitComponent: "HspExpandedHitComponent",
          key: "list",
          title: "Expanded"
        }
      ],
      initialFilter: {'type_s': ['KOD']},
      refinementListFilters: {
        1: {
          field: "entstehungsort_s",
          label: "originPlace",
        },
        2: {
          field: "format_ss",
          label: "Format",
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
          label: "BeschreibungText",
          type: "list-facet"
        },
        {
          field: "digitalisatDescription_t",
          label: "DigitalisatDescription",
          type: "list-facet"
        },
        {
          field: "digitalisatManifestId_s",
          label: "Manifest",
          type: "list-facet"
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
          label: "Stoff",
          type: "list-facet"
        },
        {
          field: "blattzahl_i",
          label: "Blattzahl",
          type: "list-facet"
        },
        {
          field: "format_ss",
          label: "Format",
          type: "list-facet"
        },
        {
          field: "entstehungsort_s",
          label: "Entstehungsort",
          type: "list-facet"
        },
        {
          field: "entstehungdatum_s",
          label: "Entstehungsdatum",
          type: "text"
        },
        {
          field: "formtyp_s",
          label: "FormTyp",
          type: "text"
        },
        {
          field: "status_s",
          label: "Status",
          type: "list-facet"
        },
        {
          field: "schrift_s",
          label: "Schrift",
          type: "list-facet"
        },
        {
          field: "schreibsprache_s",
          label: "Schreibsprache",
          type: "list-facet"
        },
        {
          field: "vorbesitzer_s",
          label: "Vorbesitzer",
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
          field: "titel_t",
          label: "title",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

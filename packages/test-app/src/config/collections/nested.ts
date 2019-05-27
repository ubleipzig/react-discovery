import {IConfig} from "../index"

export const nested: IConfig = {
  collections: {
    nested: {
      docTypes: ['KOD', 'Beschreibung', 'Digitalisat'],
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
          expandedView: true,
          hitComponent: "HspExpandedHitComponent",
          key: "list",
          title: "Expanded"
        }
      ],
      refinementListFilters: {
        1: {
          field: "entstehungsort_s",
          label: "Origin Place",
        },
        2: {
          field: "format_ss",
          label: "Format",
        },
        3: {
          field: "schreibsprache_s",
          label: "Schreibsprache",
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
          label: "Entstehungsort",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

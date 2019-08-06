import {IConfig} from "@react-discovery/configuration"

export const ubl: IConfig = {
  collections: {
    m4: {
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "DefaultHitComponent",
          type: "list",
        },
        {
          expandedView: false,
          hitComponent: "GridComponent",
          type: "grid"
        },
      ],
      initialFilter: {
        "Sprache.keyword": ["lateinisch"]
      },
      name: 'Universitätsbibliothek Leipzig',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Sprache.keyword",
          label: "Language",
          size: 10
        },
        2: {
          field: "Collection.keyword",
          label: "Date",
          size: 10
        },
        3: {
          field: "Place of publication.keyword",
          label: "Place",
          size: 10
        },
        4: {
          field: "Date of publication.raw",
          label: "date",
          size: 10
        },
      },
      searchFields: [
        {
          field: "Abmessungen",
          label: "Abmessungen",
          type: null
        },
        {
          field: "Author",
          label: "Author",
          type: null
        },
        {
          field: "Beschreibstoff",
          label: "Beschreibstoff",
          type: null
        },
        {
          field: "Callnumber",
          label: "Callnumber",
          type: null
        },
        {
          field: "Call number",
          label: "Call number",
          type: null
        },
        {
          field: "Date",
          label: "Date",
          type: null
        },
        {
          field: "Datierung",
          label: "Datierung",
          type: null
        },
        {
          field: "Date of publication",
          label: "Date of publication",
          type: null
        },
        {
          field: "Collection",
          label: "Collection",
          type: null
        },
        {
          field: "Lokalisierung",
          label: "Lokalisierung",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        },
        {
          field: "Manifest Type",
          label: "Manifest Type",
          type: null
        },
        {
          field: "Medium",
          label: "Medium",
          type: null
        },
        {
          field: "Objekttitel",
          label: "Objekttitel",
          type: null
        },
        {
          field: "Owner",
          label: "Owner",
          type: null
        },
        {
          field: "Place",
          label: "Place",
          type: null
        },
        {
          field: "Place of publication",
          label: "Place of publication",
          type: null
        },
        {
          field: "Publisher",
          label: "Publisher",
          type: null
        },
        {
          field: "Signatur",
          label: "Signatur",
          type: null
        },
        {
          field: "Sprache",
          label: "Sprache",
          type: null
        },
        {
          field: "thumbnail",
          label: "thumbnail",
          type: null
        },
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "Title",
          label: "Title",
          type: null
        },
        {
          field: "Titel (aus Signatur)",
          label: "Titel (aus Signatur)",
          type: null
        },
        {
          field: "Umfang",
          label: "Umfang",
          type: null
        },
        {
          field: "URN",
          label: "URN",
          type: null
        },
        {
          field: "Source PPN (SWB)",
          label: "Source PPN (SWB)",
          type: null
        },
      ],
      sortFields: [
        {
          field: "title.keyword",
          label: "Title",
          order: "asc"
        },
        {
          field: "Date of publication.keyword",
          label: "Date of publication",
          order: "asc"
        },
        {
          field: "Author.keyword",
          label: "Author",
          order: "asc"
        }
      ],
    }
  }
}


import {IConfig} from "@react-discovery/configuration"

export const ecodices: IConfig = {
  collections: {
    ec9: {
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
      name: 'eCodices',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Text Language.keyword",
          label: "Language",
          size: 10
        },
        2: {
          field: "Collection Name.keyword",
          label: "Collection",
          size: 10
        },
        3: {
          field: "Location.keyword",
          label: "Location",
          size: 10
        },
      },
      searchFields: [
        {
          field: "_id",
          label: "_id",
          type: null
        },
        {
          field: "Century",
          label: "Century",
          type: null
        },
        {
          field: "collection",
          label: "collection",
          type: null
        },
        {
          field: "Collection Name",
          label: "Collection Name",
          type: null
        },
        {
          field: "attribution",
          label: "attribution",
          type: null
        },
        {
          field: "Date of Origin (English)",
          label: "Date of Origin (English)",
          type: null
        },
        {
          field: "Dated",
          label: "Dated",
          type: null
        },
        {
          field: "Digitized by",
          label: "Digitized by",
          type: null
        },
        {
          field: "DOI",
          label: "DOI",
          type: null
        },
        {
          field: "Dimensions",
          label: "Dimensions",
          type: null
        },
        {
          field: "Document Type",
          label: "Document Type",
          type: null
        },
        {
          field: "Location",
          label: "Location",
          type: null
        },
        {
          field: "license",
          label: "license",
          type: null
        },
        {
          field: "Liturgica christiana",
          label: "Liturgica christiana",
          type: null
        },
        {
          field: "Material",
          label: "Material",
          type: null
        },
        {
          field: "Number of Pages",
          label: "Number of Pages",
          type: null
        },
        {
          field: "Shelfmark",
          label: "Shelfmark",
          type: null
        },
        {
          field: "Summary (English)",
          label: "Summary (English)",
          type: null
        },
        {
          field: "Text Language",
          label: "Text Language",
          type: null
        },
        {
          field: "Persons",
          label: "Persons",
          type: null
        },
        {
          field: "Place of Origin (English)",
          label: "Place of Origin (English)",
          type: null
        },
        {
          field: "Owned By (English)",
          label: "Owned By (English)",
          type: null
        },
        {
          field: "Sponsored by",
          label: "Sponsored by",
          type: null
        },
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "Title (English)",
          label: "Title (English)",
          type: null
        },
        {
          field: "related",
          label: "related",
          type: null
        },
        {
          field: "thumbnail",
          label: "thumbnail",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        }
      ],
      sortFields: [
        {
          field: "Century.keyword",
          label: "Century",
          order: "asc"
        },
        {
          field: "Persons.keyword",
          label: "Persons",
          order: "asc"
        },
        {
          field: "_score",
          label: "Relevance",
          order: "asc"
        }
      ],
    }
  }
}


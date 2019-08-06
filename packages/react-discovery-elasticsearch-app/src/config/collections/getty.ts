import {IConfig} from "@react-discovery/configuration"

export const getty: IConfig = {
  collections: {
    gt3: {
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
      name: 'Getty',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Place Created.keyword",
          label: "Place",
          size: 10
        },
        2: {
          field: "Object Type.keyword",
          label: "Object Type",
          size: 10
        },
        3: {
          field: "Medium.keyword",
          label: "Medium",
          size: 10
        },
      },
      searchFields: [
        {
          field: "Artist",
          label: "Artist",
          type: null
        },
        {
          field: "Birthplace",
          label: "Birthplace",
          type: null
        },
        {
          field: "Collection",
          label: "Collection",
          type: null
        },
        {
          field: "Culture & Date",
          label: "Culture & Date",
          type: null
        },
        {
          field: "description",
          label: "description",
          type: null
        },
        {
          field: "Dimensions",
          label: "Dimensions",
          type: null
        },
        {
          field: "Gallery Label (created)",
          label: "Gallery Label (created)",
          type: null
        },
        {
          field: "Inscription",
          label: "Inscription",
          type: null
        },
        {
          field: "Markings",
          label: "Markings",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        },
        {
          field: "Medium",
          label: "Medium",
          type: null
        },
        {
          field: "Object Number",
          label: "Object Number",
          type: null
        },
        {
          field: "Object Type",
          label: "Object Type",
          type: null
        },
        {
          field: "Place Created",
          label: "Place Created",
          type: null
        },
        {
          field: "Place Depicted",
          label: "Place Depicted",
          type: null
        },
        {
          field: "Place Found",
          label: "Place Found",
          type: null
        },
        {
          field: "Rights Statement",
          label: "Rights Statement",
          type: null
        },
        {
          field: "Signed",
          label: "Signed",
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
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "within",
          label: "within",
          type: null
        }
      ],
      sortFields: [
        {
          field: "title.keyword",
          label: "Title",
          order: "asc"
        },
        {
          field: "Artist.keyword",
          label: "Artist",
          order: "asc"
        },
        {
          field: "Object Number.keyword",
          label: "Object Number",
          order: "asc"
        }
      ],
    }
  }
}


import {IConfig} from "@react-discovery/configuration"

export const harvard: IConfig = {
  collections: {
    hvd2: {
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
      name: 'Harvard',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Classification.keyword",
          label: "Classification",
          size: 10
        },
        2: {
          field: "Date.keyword",
          label: "Date",
          size: 10
        },
        3: {
          field: "Technique.keyword",
          label: "Technique",
          size: 10
        },
      },
      searchFields: [
        {
          field: "Medium",
          label: "Medium",
          type: null
        },
        {
          field: "Classification",
          label: "Classification",
          type: null
        },
        {
          field: "Credit Line",
          label: "Credit Line",
          type: null
        },
        {
          field: "Dimensions",
          label: "Dimensions",
          type: null
        },
        {
          field: "Object Number",
          label: "Object Number",
          type: null
        },
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "Technique",
          label: "Technique",
          type: null
        },
        {
          field: "Provenance",
          label: "Provenance",
          type: null
        },
        {
          field: "People",
          label: "People",
          type: null
        },
        {
          field: "Date",
          label: "Date",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
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
          field: "Technique.keyword",
          label: "Technique",
          order: "asc"
        },
        {
          field: "Date.keyword",
          label: "Date",
          order: "asc"
        }
      ],
    }
  }
}


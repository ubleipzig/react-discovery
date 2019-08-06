import {IConfig} from "@react-discovery/configuration"

export const nga: IConfig = {
  collections: {
    nga2: {
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
      name: 'National Gallery of Art',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Artist.keyword",
          label: "Artist",
          size: 10
        },
        2: {
          field: "Creation Year.keyword",
          label: "Creation Year",
          size: 10
        },
        3: {
          field: "description.keyword",
          label: "Description",
          size: 10
        },
      },
      searchFields: [
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "Accession Number",
          label: "Accession Number",
          type: null
        },
        {
          field: "Artist",
          label: "Artist",
          type: null
        },
        {
          field: "Creation Year",
          label: "Creation Year",
          type: null
        },
        {
          field: "Title",
          label: "Title",
          type: null
        },
        {
          field: "attribution",
          label: "attribution",
          type: null
        },
        {
          field: "description",
          label: "description",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        },
        {
          field: "thumbnail",
          label: "thumbnail",
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
          field: "Creation Year.keyword",
          label: "Creation Year",
          order: "asc"
        },
        {
          field: "Artist.keyword",
          label: "Artist",
          order: "asc"
        }
      ],
    }
  }
}


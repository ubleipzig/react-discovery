import {IConfig} from "@react-discovery/configuration"

export const wales: IConfig = {
  collections: {
    wales1: {
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
      logo: "https://damsssl.llgc.org.uk/iiif/2.0/image/logo/full/170,/0/default.jpg",
      name: 'Llyfrgell Genedlaethol Cymru',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Author.keyword",
          label: "Author",
          size: 10
        },
        2: {
          field: "Date.keyword",
          label: "Date",
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
          field: "_id",
          label: "_id",
          type: null
        },
        {
          field: "Alternate Title",
          label: "Alternate Title",
          type: null
        },
        {
          field: "Author",
          label: "Author",
          type: null
        },
        {
          field: "Date",
          label: "Date",
          type: null
        },
        {
          field: "License",
          label: "License",
          type: null
        },
        {
          field: "Permalink",
          label: "Permalink",
          type: null
        },
        {
          field: "Physical Description",
          label: "Physical Description",
          type: null
        },
        {
          field: "Repository",
          label: "Repository",
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
        },
        {
          field: "title",
          label: "title",
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
          field: "Date.keyword",
          label: "Date",
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


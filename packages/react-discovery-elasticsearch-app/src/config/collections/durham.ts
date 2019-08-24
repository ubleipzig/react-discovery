import {IConfig} from "@react-discovery/configuration"

export const durham: IConfig = {
  collections: {
    dh1: {
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
      logo: "https://images.iiif.cloud/iiif/2/duruni_logo.tif/full/170,/0/default.jpg",
      name: 'Durham University',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "collectionTag1.keyword",
          label: "Collection",
          size: 10
        },
        2: {
          field: "collection.keyword",
          label: "SubCollection",
          size: 10
        },
        3: {
          field: "Author.keyword",
          label: "Author",
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
          field: "Author",
          label: "Author",
          type: null
        },
        {
          field: "collection",
          label: "collection",
          type: null
        },
        {
          field: "Published",
          label: "Published",
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
          field: "title",
          label: "title",
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
          field: "collection.keyword",
          label: "Collection",
          order: "asc"
        },
        {
          field: "Author.keyword",
          label: "Author",
          order: "asc"
        },
        {
          field: "Published.keyword",
          label: "Published",
          order: "desc"
        }
      ],
    }
  }
}


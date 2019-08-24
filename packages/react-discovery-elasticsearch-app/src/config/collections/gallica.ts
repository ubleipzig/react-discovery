import {IConfig} from "@react-discovery/configuration"

export const gallica: IConfig = {
  collections: {
    ga2: {
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
      logo: "https://images.iiif.cloud/iiif/2/bnf.tif/full/170,/0/default.jpg",
      name: 'Bibliothèque nationale de France',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "collection.keyword",
          label: "Collection",
          size: 10
        },
        2: {
          field: "Language.keyword",
          label: "Language",
          size: 10
        },
        3: {
          field: "Date.keyword",
          label: "Date",
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
          field: "Creator",
          label: "Creator",
          type: null
        },
        {
          field: "Date",
          label: "Date",
          type: null
        },
        {
          field: "Digitisation funded by",
          label: "Digitisation funded by",
          type: null
        },
        {
          field: "Digitised by",
          label: "Digitised by",
          type: null
        },
        {
          field: "Format",
          label: "Format",
          type: null
        },
        {
          field: "Language",
          label: "Language",
          type: null
        },
        {
          field: "Metadata Source",
          label: "Metadata Source",
          type: null
        },
        {
          field: "Place",
          label: "Place",
          type: null
        },
        {
          field: "Relation",
          label: "Relation",
          type: null
        },
        {
          field: "Repository",
          label: "Repository",
          type: null
        },
        {
          field: "Shelfmark",
          label: "Shelfmark",
          type: null
        },
        {
          field: "Source Images",
          label: "Source Images",
          type: null
        },
        {
          field: "Title",
          label: "Title",
          type: null
        },
        {
          field: "Type",
          label: "Type",
          type: null
        },
        {
          field: "attribution",
          label: "attribution",
          type: null
        },
        {
          field: "collection",
          label: "collection",
          type: null
        },
        {
          field: "description",
          label: "description",
          type: null
        },
        {
          field: "license",
          label: "license",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        },
        {
          field: "related",
          label: "related",
          type: null
        },
        {
          field: "seeAlso",
          label: "seeAlso",
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
          field: "Title.keyword",
          label: "Title",
          order: "asc"
        },
        {
          field: "Creator.keyword",
          label: "Creator",
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


import {IConfig} from "@react-discovery/configuration"

export const ox1: IConfig = {
  collections: {
    ox1: {
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "DefaultHitComponent",
          key: "default",
        },
      ],
      name: 'Oxford',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "collections.keyword",
          label: "Collection",
        },
        2: {
          field: "subjects.keyword",
          label: "Subject",
        },
        3: {
          field: "locations.keyword",
          label: "Location",
        },
      },
      searchFields: [
        {
          field: "accessRights",
          label: "accessRights",
          type: null
        },
        {
          field: "alternatives",
          label: "alternatives",
          type: null
        },
        {
          field: "attribution",
          label: "attribution",
          type: null
        },
        {
          field: "catalogueId",
          label: "catalogueId",
          type: null
        },
        {
          field: "collections",
          label: "collections",
          type: null
        },
        {
          field: "contributors",
          label: "contributors",
          type: null
        },
        {
          field: "coverages",
          label: "coverages",
          type: null
        },
        {
          field: "creators",
          label: "creators",
          type: null
        },
        {
          field: "dates",
          label: "dates",
          type: null
        },
        {
          field: "description",
          label: "description",
          type: null
        },
        {
          field: "descriptions",
          label: "descriptions",
          type: null
        },
        {
          field: "displayLanguages",
          label: "displayLanguages",
          type: null
        },
        {
          field: "formats",
          label: "formats",
          type: null
        },
        {
          field: "identifiers",
          label: "identifiers",
          type: null
        },
        {
          field: "incipits",
          label: "incipits",
          type: null
        },
        {
          field: "languages",
          label: "languages",
          type: null
        },
        {
          field: "locations",
          label: "locations",
          type: null
        },
        {
          field: "manifest",
          label: "manifest",
          type: null
        },
        {
          field: "publisher",
          label: "publisher",
          type: null
        },
        {
          field: "related",
          label: "related",
          type: null
        },
        {
          field: "shelfmark",
          label: "shelfmark",
          type: null
        },
        {
          field: "sources",
          label: "sources",
          type: null
        },
        {
          field: "subjects",
          label: "subjects",
          type: null
        },
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "titles",
          label: "titles",
          type: null
        },
        {
          field: "types",
          label: "types",
          type: null
        },
        {
          field: "seeAlso",
          label: "seeAlso",
          type: null
        },
      ],
      sortFields: [
        {
          field: "titles.keyword",
          label: "Title",
          order: "asc"
        },
        {
          field: "creators.keyword",
          label: "Creator",
          order: "asc"
        },
        {
          field: "dates.keyword",
          label: "Date",
          order: "desc"
        }
      ],
    }
  }
}


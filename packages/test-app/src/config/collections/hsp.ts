import {IConfig} from "../index"

export const hsp: IConfig = {
  collections: {
    hsp: {
      refinementListFilters: {
        1: {
          label: "Language",
          field: "schreibsprachen_0_.name",
        },
        2: {
          label: "Place",
          field: "entstehungsDaten_0_.entstehungsort.name",
        },
        3: {
          label: "Material",
          field: "stoffe_0_.name",
        },
      },
      searchFields: [
        {
          label: "Title",
          field: "titel",
          type: "text"
        },
        {
          label: "Holding Place",
          field: "aufbewarungOrt.name",
          type: "list-facet"
        },
        {
          label: "Material",
          field: "stoffe_0_.name",
          type: "list-facet"
        },
        {
          label: "Language",
          field: "schreibsprachen_0_.name",
          type: "list-facet"
        },
        {
          label: "Origin Place",
          field: "entstehungsDaten_0_.entstehungsort.name",
          type: "list-facet"
        },
        {
          label: "Signatur",
          field: "signatur",
          type: "text"
        },
      ],
      sortFields: [
        {
          label: "Holding Place",
          field: "aufbewarungOrt.name",
          order: "asc"
        },
        {
          label: "Origin Place",
          field: "entstehungsDaten_0_.entstehungsort.name",
          order: "asc"
        },
        {
          label: "Language",
          field: "schreibsprachen_0_.name",
          order: "asc"
        },
        {
          label: "Material",
          field: "stoffe_0_.name",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

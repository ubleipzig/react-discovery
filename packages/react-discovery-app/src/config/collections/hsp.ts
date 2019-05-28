import {IConfig} from "../index"

export const hsp: IConfig = {
  collections: {
    hsp: {
      hitComponents: [
        {
          defaultOption: true,
          hitComponent: "DefaultHitComponent",
          key: "list",
          title: "Default"
        },
        {
          hitComponent: "ExpandedHitComponent",
          key: "list",
          title: "Expanded"
        }
      ],
      refinementListFilters: {
        1: {
          field: "schreibsprachen_0_.name",
          label: "Language",
        },
        2: {
          field: "entstehungsDaten_0_.entstehungsort.name",
          label: "Place",
        },
        3: {
          field: "stoffe_0_.name",
          label: "Material",
        },
      },
      searchFields: [
        {
          field: "titel",
          label: "Title",
          type: "text"
        },
        {
          field: "aufbewarungOrt.name",
          label: "Holding Place",
          type: "list-facet"
        },
        {
          field: "stoffe_0_.name",
          label: "Material",
          type: "list-facet"
        },
        {
          field: "schreibsprachen_0_.name",
          label: "Language",
          type: "list-facet"
        },
        {
          field: "entstehungsDaten_0_.entstehungsort.name",
          label: "Origin Place",
          type: "list-facet"
        },
        {
          field: "signatur",
          label: "Signatur",
          type: "text"
        },
      ],
      sortFields: [
        {
          field: "aufbewarungOrt.name",
          label: "Holding Place",
          order: "asc"
        },
        {
          field: "entstehungsDaten_0_.entstehungsort.name",
          label: "Origin Place",
          order: "asc"
        },
        {
          field: "schreibsprachen_0_.name",
          label: "Language",
          order: "asc"
        },
        {
          field: "stoffe_0_.name",
          label: "Material",
          order: "asc"
        },
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

import {IConfig} from "../index"

export const gettingstarted: IConfig = {
  collections: {
    gettingstarted: {
      refinementListFilters: {
        1: {
          field: 'characteristics_ss',
          label: 'Characteristics',
        },
        2: {
          field: 'domains_ss',
          label: 'Domains',
        }
      },
      searchFields: [
        {
          field: "name_t",
          label: "Name",
          type: "text"
        },
        {
          field: "characteristics_ss",
          label: "Characteristics",
          type: "list-facet"
        },
        {
          field: "domains_ss",
          label: "Domains",
          type: "list-facet"
        },
        {
          field: "birthDate_i",
          label: "Date of birth",
          type: "range-facet"
        },
        {
          field: "deathDate_i",
          label: "Date of death",
          type: "range-facet"
        }
      ],
      sortFields: [
        {
          field: "koppelnaam_s",
          label: "Name",
          order: "asc"
        },
        {
          field: "birthDate_i",
          label: "Date of birth",
          order: "asc"
        },
        {
          field: "deathDate_i",
          label: "Date of death",
          order: "asc"
        }
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

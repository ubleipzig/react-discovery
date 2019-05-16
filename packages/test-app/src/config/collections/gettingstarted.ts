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
          label: "Name",
          field: "name_t",
          type: "text"
        },
        {
          label: "Characteristics",
          field: "characteristics_ss",
          type: "list-facet"
        },
        {
          label: "Domains",
          field: "domains_ss",
          type: "list-facet"
        },
        {
          label: "Date of birth",
          field: "birthDate_i",
          type: "range-facet"
        },
        {
          label: "Date of death",
          field: "deathDate_i",
          type: "range-facet"
        }
      ],
      sortFields: [
        {
          label: "Name",
          field: "koppelnaam_s",
          order: "asc"
        },
        {
          label: "Date of birth",
          field: "birthDate_i",
          order: "asc"
        },
        {
          label: "Date of death",
          field: "deathDate_i",
          order: "asc"
        }
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

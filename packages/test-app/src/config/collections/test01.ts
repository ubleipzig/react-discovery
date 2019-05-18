import {IConfig} from "../index"

export const test01: IConfig = {
  collections: {
    test01: {
      refinementListFilters: {
        1: {
          field: 'place_s',
          label: 'Place',
        },
        2: {
          field: 'department_s',
          label: 'Department',
        }
      },
      searchFields: [
        {
          field: "name_t",
          label: "Name",
          type: "text"
        },
        {
          field: "place_s",
          label: "Place",
          type: "list-facet"
        },
        {
          field: "department_s",
          label: "Department",
          type: "list-facet"
        },
        {
          field: "tags_ss",
          label: "Tags",
          type: "list-facet"
        },
        {
          field: "year_i",
          label: "Year",
          type: "list-facet"
        }
      ],
      sortFields: [
        {
          field: "place_s",
          label: "Place",
          order: "asc"
        },
        {
          field: "department_s",
          label: "Department",
          order: "asc"
        },
        {
          field: "year_i",
          label: "Year",
          order: "asc"
        }
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

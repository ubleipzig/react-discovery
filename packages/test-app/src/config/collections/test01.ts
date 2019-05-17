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
          label: "Name",
          field: "name_t",
          type: "text"
        },
        {
          label: "Place",
          field: "place_s",
          type: "list-facet"
        },
        {
          label: "Department",
          field: "department_s",
          type: "list-facet"
        },
        {
          label: "Tags",
          field: "tags_ss",
          type: "list-facet"
        },
        {
          label: "Year",
          field: "year_i",
          type: "list-facet"
        }
      ],
      sortFields: [
        {
          label: "Place",
          field: "place_s",
          order: "asc"
        },
        {
          label: "Department",
          field: "department_s",
          order: "asc"
        },
        {
          label: "Year",
          field: "year_i",
          order: "asc"
        }
      ],
      url: process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION
    }
  }
}

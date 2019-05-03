export const gettingstarted = {
  searchFields: [
    {
      label: "All text fields",
      field: "*",
      type: "text"
    },
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
      field: "koppelnaam_s"
    },
    {
      label: "Date of birth",
      field: "birthDate_i"
    },
    {
      label: "Date of death",
      field: "deathDate_i"
    }
  ]
}

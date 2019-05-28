import {buildDisMaxQuery, buildFacetFieldParams, buildFilterQueryParams, extendedDisMaxQueryBuilder} from '../extendedDisMaxQueryBuilder'

const searchFields = [{
  field: "field_01",
  label: null,
  type: 'text'
},
{
  field: "field_02",
  label: null,
  type: 'text'
}]

const filters = {
  department_s: ['IT', 'Accounting'],
  place_s: ['Sarajevo', 'Oslo'],
}

const sortFields = [
  {
    field: 'year_i',
    isSelected: true,
    label: 'Year',
    order: 'desc',

  },
  {
    field: 'place_s',
    isSelected: false,
    label: 'Place',
    order: 'asc',
  },
  {
    field: 'name_t',
    isSelected: false,
    label: 'Name',
    order: 'asc',
  },
  {
    field: 'department_s',
    isSelected: false,
    label: 'Department',
    order: 'asc',
  }
]
describe("extendedDisMaxQueryBuilder", () => {
  describe("buildDisMaxQuery", () => {
    it("should return space separated query fields", () => {
      expect(buildDisMaxQuery(searchFields,
        "12345")).toEqual({"defType": "edismax", "q": "12345", "qf": "field_01 field_02"});
    });
    it("should return wildcard if no string input", () => {
      expect(buildDisMaxQuery(searchFields,
        "")).toEqual({"defType": "edismax", "q": "*", "qf": "field_01 field_02"});
    });
    it("should return facet fields", () => {
      expect(buildFacetFieldParams([{
        field: "field_01",
        label: null,
        type: 'range-facet'
      },
      {
        field: "field_02",
        label: null,
        type: 'list-facet'
      }])).toEqual({"facet.field": ['field_01', 'field_02']});
    });
    it("should return empty string given no facet fields", () => {
      expect(buildFacetFieldParams([])).toEqual("");
    });
    it("should return a filter query", () => {
      expect(buildFilterQueryParams(filters))
        .toEqual({"fq": ["department_s:\"IT\"", "department_s:\"Accounting\"", "place_s:\"Sarajevo\"", "place_s:\"Oslo\""]});
    });
    it("should return complete dismax query string", () => {
      const props = {
        facetLimit: -1,
        filters,
        group: false,
        groupField: null,
        highlighting: true,
        searchFields,
        size: 20,
        sortFields,
        start: 0,
        stringInput: 'xyz',
        typeDef: 'dismax',
        url: 'https://example.org',
      }
      expect(extendedDisMaxQueryBuilder(props)).toEqual("https://example.org/query?defType=edismax&facet=true&facet.limit=-1&facet.sort=index&fq=department_s%3A%22IT%22&fq=department_s%3A%22Accounting%22&fq=place_s%3A%22Sarajevo%22&fq=place_s%3A%22Oslo%22&hl=true&hl.fl=%2A&q=xyz&qf=field_01%20field_02&rows=20&sort=year_i%20desc&start=0");
    });
  })
})

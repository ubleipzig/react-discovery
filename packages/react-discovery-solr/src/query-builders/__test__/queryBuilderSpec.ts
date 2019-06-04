import {
  buildFacetFieldParams,
  buildFilterQueryParams,
  buildQueryFieldParams,
  buildStringInputParams,
  queryBuilder
} from '../queryBuilder'

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
describe("queryBuilder", () => {
  describe("buildQuery", () => {
    it("should return space separated query fields", () => {
      expect(buildQueryFieldParams("edismax", searchFields)).toEqual({"qf": "field_01 field_02"});
    });
    it("should return string input", () => {
      expect(buildStringInputParams("edismax", "12345", null)).toEqual({"q": "12345"});
    });
    it("should return wildcard if no string input and edismax", () => {
      expect(buildStringInputParams("edismax", "", null)).toEqual({"q": "*"});
    });
    it("should return wildcards if no string input and lucene", () => {
      expect(buildStringInputParams("lucene", "", null)).toEqual({"q": "*:*"});
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
    it("should return complete query string", () => {
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
        typeDef: 'edismax',
        url: 'https://example.org',
      }
      expect(queryBuilder(props)).toEqual("https://example.org/query?defType=edismax&facet=true&facet.limit=-1&facet.sort=index&fl=%2A%2C%20%5Bchild%5D&fq=department_s%3A%22IT%22&fq=department_s%3A%22Accounting%22&fq=place_s%3A%22Sarajevo%22&fq=place_s%3A%22Oslo%22&hl=true&hl.fl=%2A&q=xyz&qf=field_01%20field_02&rows=20&sort=year_i%20desc&start=0");
    });
  })
})

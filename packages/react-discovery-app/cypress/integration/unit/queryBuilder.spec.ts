import {
  buildFacetFieldParams,
  buildFilterQueryParams,
  buildQueryFieldParams,
  buildStringInputParams,
  queryBuilder
} from '@react-discovery/solr'

const searchFields = [{
  field: "field_01",
  label: '',
  type: 'text'
},
{
  field: "field_02",
  label: '',
  type: 'text'
}]

const filters = {
  department_s: ['IT', 'Accounting'],  //eslint-disable-line
  place_s: ['Sarajevo', 'Oslo'], //eslint-disable-line
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
describe("solr query builder", (): void => {
  describe("buildQuery", (): void => {
    it("should return space separated query fields", (): void => {
      expect(buildQueryFieldParams("edismax", searchFields)).to.deep.equal({"qf": "field_01 field_02"});
    });
    it("should return string input", (): void => {
      expect(buildStringInputParams("edismax", "12345", [])).to.deep.equal({"q": "12345"});
    });
    it("should return wildcard if no string input and edismax", (): void => {
      expect(buildStringInputParams("edismax", "", [])).to.deep.equal({"q": "*"});
    });
    it("should return wildcards if no string input and lucene", (): void => {
      expect(buildStringInputParams("lucene", "", [])).to.deep.equal({"q": "*:*"});
    });
    it("should return facet fields", (): void => {
      expect(buildFacetFieldParams([{
        field: "field_01",
        label: '',
        type: 'range-facet'
      },
      {
        field: "field_02",
        label: '',
        type: 'list-facet'
      }])).to.deep.equal({"facet.field": ['field_01', 'field_02']});
    });
    it("should return empty string given no facet fields", (): void => {
      expect(buildFacetFieldParams([])).to.equal("");
    });
    it("should return a filter query", (): void => {
      expect(buildFilterQueryParams(filters))
        .to.deep.equal({"fq": ["department_s:\"IT\"", "department_s:\"Accounting\"", "place_s:\"Sarajevo\"", "place_s:\"Oslo\""]});
    });
    it("should return complete query string", (): void => {
      const props = {
        facetLimit: -1,
        filters,
        group: false,
        groupField: '',
        isHighlighted: true,
        searchFields,
        size: 20,
        sortFields,
        start: 0,
        stringInput: 'xyz',
        typeDef: 'edismax',
        url: 'https://example.org',
      }
      expect(queryBuilder(props)).to.equal("https://example.org/query?defType=edismax&facet=true" +
        "&facet.limit=-1&facet.mincount=1&facet.sort=index&fl=%2A%2C%20%5Bchild%5D&fq=department_s%3A%22IT%22" +
        "&fq=department_s%3A%22Accounting%22&fq=place_s%3A%22Sarajevo%22&fq=place_s%3A%22Oslo%22" +
        "&hl=true&hl.fl=%2A&q=xyz&qf=field_01%20field_02&rows=20&sort=year_i%20desc&start=0");
    });
  })
})

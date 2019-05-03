export const rangeFacetToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length < 2) {
    return null;
  }
  return encodeURIComponent(`${field.field}:[${filters[0]} TO ${filters[1]}]`);
};

export const periodRangeFacetToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length < 2) {
    return null;
  }
  return encodeURIComponent(
    `${field.lowerBound}:[${filters[0]} TO ${filters[1]}] OR ` +
    `${field.upperBound}:[${filters[0]} TO ${filters[1]}] OR ` +
    `(${field.lowerBound}:[* TO ${filters[0]}] AND ${field.upperBound}:[${filters[1]} TO *])`
  );
};

export const listFacetFieldToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length === 0) {
    return null;
  }
  const filterQ = filters.map((f) => `"${f}"`).join(" OR ");
  return encodeURIComponent(`${field.field}:(${filterQ})`);
};

export const textFieldToQueryFilter = (field) => {
  if (!field.value || field.value.length === 0) {
    return null;
  }
  return encodeURIComponent(field.field === "*" ? field.value : `${field.field}:${field.value}`);
};

export const fieldToQueryFilter = (field) => {
  if (field.type === "text") {
    return textFieldToQueryFilter(field);
  } else if (field.type === "list-facet") {
    return listFacetFieldToQueryFilter(field);
  } else if (field.type === "range-facet" || field.type === "range") {
    return rangeFacetToQueryFilter(field);
  } else if (field.type === "period-range-facet" || field.type === "period-range") {
    return periodRangeFacetToQueryFilter(field);
  }
  return null;
};

export const buildQuery = (fields, mainQueryField) => fields
// Do not include main query field in filter field query param.
  .filter((searchField) => (!Object.hasOwnProperty.call(searchField, "field")
    || (Object.hasOwnProperty.call(searchField, "field") && searchField.field !== mainQueryField)))
  .map(fieldToQueryFilter)
  .filter((queryFilter) => queryFilter !== null)
  .map((queryFilter) => `fq=${queryFilter}`)
  .join("&");

export const facetFields = (fields) => fields
  .filter((field) => field.type === "list-facet" || field.type === "range-facet")
  .map((field) => `facet.field=${encodeURIComponent(field.field)}`)
  .concat(
    fields
      .filter((field) => field.type === "period-range-facet")
      .map((field) => `facet.field=${encodeURIComponent(field.lowerBound)}&facet.field=${encodeURIComponent(field.upperBound)}`)
  )
  .join("&");

export const facetSorts = (fields) => fields
  .filter((field) => field.facetSort)
  .map((field) => `f.${encodeURIComponent(field.field)}.facet.sort=${field.facetSort}`)
  .join("&");

export const buildSort = (sortFields) => sortFields
  .filter((sortField) => sortField.value)
  .map((sortField) => encodeURIComponent(`${sortField.field} ${sortField.value}`))
  .join(",");

export const buildFormat = (format) => Object.keys(format)
  .map((key) => `${key}=${encodeURIComponent(format[key])}`)
  .join("&");

export const buildMainQuery = (fields, mainQueryField, isD7, proxyIsDisabled) => {
  // Use "search" as the main param for D7 proxy implementations.
  const mainParam = isD7 && !proxyIsDisabled ? "search" : "q";
  let params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    return searchField.value;
  });
  // Add value of the mainQueryField to the q param, if there is one.
  if (params[0]) {
    return `${mainParam}=${params[0]}`;
  }
  // If query field exists but is null/empty/undefined send the wildcard query.
  return `${mainParam}=*:*`;
};

export const buildHighlight = (highlight) => {
  let hlQs = "";
  // If highlight is set, then populate params from keys/values.
  if (highlight !== null && typeof highlight === "object") {
    let hlParams = "hl=on";
    for (const key of Object.keys(highlight)) {
      // Support nested objects like hl.simple.tags
      if (typeof highlight[key] === "object") {
        for (const nestedKey of Object.keys(highlight[key])) {
          hlParams += `&hl.${key}.${nestedKey}=${encodeURIComponent(highlight[key][nestedKey])}`;
        }
      } else {
        hlParams += `&hl.${key}=${encodeURIComponent(highlight[key])}`;
      }
    }
    hlQs = hlParams;
  }
  return hlQs;
};

export const solrQuery = (query, format = {wt: "json"}) => {
  const {
    searchFields,
    sortFields,
    rows,
    start,
    facetLimit,
    facetSort,
    pageStrategy,
    cursorMark,
    idField,
    group,
    hl,
    isD7,
    proxyIsDisabled
  } = query;

  const mainQueryField = Object.hasOwnProperty.call(query, "mainQueryField") ? query.mainQueryField : null;
  const filters = (query.filters || []).map((filter) => ({...filter, type: filter.type || "text"}));
  const mainQuery = buildMainQuery(searchFields.concat(filters), mainQueryField, isD7, proxyIsDisabled);
  const queryParams = buildQuery(searchFields.concat(filters), mainQueryField);
  const facetFieldParam = facetFields(searchFields);
  const facetSortParams = facetSorts(searchFields);
  const facetLimitParam = `facet.limit=${facetLimit || -1}`;
  const facetSortParam = `facet.sort=${facetSort || "index.ts"}`;
  const cursorMarkParam = pageStrategy === "cursor" ? `cursorMark=${encodeURIComponent(cursorMark || "*")}` : "";
  const idSort = pageStrategy === "cursor" ? [{field: idField, value: "asc"}] : [];
  const sortParam = buildSort(sortFields.concat(idSort));
  const groupParam = group && group.field ? `group=on&group.field=${encodeURIComponent(group.field)}` : "";
  const highlightParam = buildHighlight(hl);
  return mainQuery +
    `${queryParams.length > 0 ? `&${queryParams}` : ""}` +
    `${sortParam.length > 0 ? `&sort=${sortParam}` : ""}` +
    `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}` +
    `${facetSortParams.length > 0 ? `&${facetSortParams}` : ""}` +
    `${groupParam.length > 0 ? `&${groupParam}` : ""}` +
    `&rows=${rows}` +
    `&${facetLimitParam}` +
    `&${facetSortParam}` +
    `&${cursorMarkParam}` +
    (start === null ? "" : `&start=${start}`) +
    "&facet=on" +
    (highlightParam === "" ? "" : `&${highlightParam}`) +
    `&${buildFormat(format)}`;
};

export const buildSuggestQuery = (fields, mainQueryField, appendWildcard, isProxyDisabled, isD7) => {
  // Use "search" as the main param for D7 proxy implementations.
  let qs = isD7 && !isProxyDisabled ? "search=" : "q=";
  let params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    // Remove spaces on either end of the value.
    const trimmed = searchField.value.trim();
    // One method of supporting search-as-you-type is to append a wildcard '*'
    //   to match zero or more additional characters at the end of the users search term.
    // @see: https://lucene.apache.org/solr/guide/6_6/the-standard-query-parser.html#TheStandardQueryParser-WildcardSearches
    // @see: https://opensourceconnections.com/blog/2013/06/07/search-as-you-type-with-solr/
    if (appendWildcard && trimmed.length > 0) {
      if (isProxyDisabled) {
        // Split into word chunks.
        const words = trimmed.split(" ");
        // If there are multiple chunks, join them with "+", repeat the last word + append "*".
        if (words.length > 1) {
          return `${words.join("+")}+${words.pop()}*`;
        }
        // If there is only 1 word, repeat it an append "*".
        return `${words}+${words}*`;
      } else {
        return `${trimmed}*`;
      }
    }
    // If we are not supposed to append a wildcard, just return the value.
    // ngram tokens/filters should be set up in solr config for
    // the autocomplete endpoint request handler.
    return trimmed;
  });

  if (params[0]) {
    qs += params[0];
  }
  return qs;
};

export const solrSuggestQuery = (suggestQuery, format = {wt: "json"}) => {
  const {
    rows,
    searchFields,
    filters,
    appendWildcard,
    proxyIsDisabled,
    isD7
  } = suggestQuery;

  const mainQueryField = Object.hasOwnProperty.call(suggestQuery, "mainQueryField") ? suggestQuery.mainQueryField : null;
  const queryFilters = (filters || []).map((filter) => ({...filter, type: filter.type || "text"}));
  const mainQuery = buildSuggestQuery(searchFields.concat(queryFilters), mainQueryField, appendWildcard, proxyIsDisabled, isD7);
  const queryParams = buildQuery(searchFields.concat(queryFilters), mainQueryField);
  const facetFieldParam = facetFields(searchFields);
  return mainQuery +
    `${queryParams.length > 0 ? `&${queryParams}` : ""}` +
    `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}` +
    `&rows=${rows}` +
    `&${buildFormat(format)}`;
};

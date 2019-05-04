import React, {useEffect, useState, ReactElement} from 'react'
import {connect} from 'react-redux'
import {fetchSolrResponseWorker, setQueryFields, setStart, solrQuery, usePrevious} from 'solr-react-faceted-search'
import {gettingstarted} from "../config"

const MinimalResultsViewerComponent: React.FC<any> = (props): ReactElement => {
  const {fetchSolrResponseWorker, setQueryFields, results, rows, setStart, start} = props
  const {searchFields, sortFields, url} = gettingstarted
  const prevStart = usePrevious(start)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchResponse = (query) => {
    const queryString = solrQuery(query);
    const requestUrl = `${query.url}?${queryString}`
    fetchSolrResponseWorker({requestUrl})
    return true
  }

  useEffect(() => {
    const query = {searchFields, sortFields, url, start, rows}
    if (!isInitialized) {
      setQueryFields({...query})
      setIsInitialized(fetchResponse(query))
    }
    if (isInitialized && prevStart !== start) {
      setQueryFields({...query})
      fetchResponse(query)
    }
  }, [isInitialized, start])

  const renderValue = (field, doc) => {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  const {numFound} = results;
  const pageAmt = Math.ceil(numFound / rows);
  const currentPage = start / rows;

  const onPageChange = (page, pageAmt) =>
  {
    if (page >= pageAmt || page < 0) {
      return;
    }
    setStart({newStart: page * rows});
  }

  return (
    <>
      <div>
        <ul>
          <li key="start">
            <a onClick={() => onPageChange( 0, pageAmt)}>&lt;&lt;</a>
          </li>
          <li key="prev">
            <a onClick={() => onPageChange(currentPage - 1, pageAmt)}>&lt;</a>
          </li>
          <li key="next">
            <a onClick={() => onPageChange(currentPage + 1, pageAmt)}>&gt;</a>
          </li>
          <li key="end">
            <a onClick={() => onPageChange(pageAmt - 1, pageAmt)}>&gt;&gt;</a>
          </li>
        </ul>
      </div>
      <div className={"solr-search-results"}>
        <ul className={"list-group"}>
          {results && Object.keys(results).length && results.docs && results.docs.map((doc, i) => (
            <li key={i} className={"list-group-item"}>
              <ul>
              {searchFields.filter((field) => field.field !== "*").map((field, i) =>
                  <li key={i}>
                    <label>{field.label || field.field}</label>
                    {renderValue(field.field, doc)}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const pageStrategy = "paginate"

const mapStateToProps = (state): any => ({
  query: state.query,
  rows: state.query.rows ? state.query.rows: 20,
  searchFields: state.query && state.query.searchFields,
  start: state.query.start ? pageStrategy === "paginate" ? state.query.start : 0 : 0,
  results: state.response
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields, setStart}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


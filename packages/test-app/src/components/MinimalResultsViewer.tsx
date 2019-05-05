import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import {fetchSolrResponseWorker, setQueryFields, SolrResponseProvider} from 'solr-react-faceted-search'
import {gettingstarted} from "../config"
import {Pagination} from '.'

const MinimalResultsViewerComponent: React.FC<any> = (props): ReactElement => {
  const {results, rows, start} = props
  const {searchFields, sortFields, url} = gettingstarted
  const query = {searchFields, sortFields, url, start, rows}

  const renderValue = (field, doc) => {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  return (
    <SolrResponseProvider query={query}>
      <Pagination/>
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
    </SolrResponseProvider>
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
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


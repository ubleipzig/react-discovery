import React, {useEffect, useState, ReactElement} from 'react'
import {connect} from 'react-redux'
import {setResultsState, usePrevious} from 'solr-react-faceted-search'

const MinimalResultsViewerComponent: React.FC<any> = (props): ReactElement => {
  const {setResultsState, searchFields, results} = props
  const [isInitialized, setIsInitialized] = useState(false)
  const prevResults = usePrevious(results)
  const renderValue = (field, doc) => {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  useEffect(() => {
    if (!prevResults === results) {
      setResultsState({results: results})
    }
  })

  return (
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
  );
}

const mapStateToProps = (state): any => ({
  query: state.query,
  searchFields: state.query && state.query.searchFields,
  results: state.response
})
const mapDispatchToProps = {setResultsState}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


import React, {ReactElement} from 'react'
import {connect} from 'react-redux'

const MinimalResultsViewerComponent: React.FC<any> = (props): ReactElement => {
  const {fields, results} = props
  const renderValue = (field, doc) => {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  return (
    <div className={"solr-search-results"}>
      <ul className={"list-group"}>
        {results && results.docs.map((doc, i) => (
          <li key={i} className={"list-group-item"}>
            <ul>
            {fields.filter((field) => field.field !== "*").map((field, i) =>
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
  query: state && state.query,
  results: state && state.results
})

export const MinimalResultsViewer = connect(mapStateToProps, {})(MinimalResultsViewerComponent)


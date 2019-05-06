import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { makeStyles } from '@material-ui/core/styles'
import {fetchSolrResponseWorker, setQueryFields, SolrResponseProvider} from 'solr-react-faceted-search'
import {gettingstarted} from "../config"
import {Pagination, SearchBox} from '.'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    display: 'inline-block',
    color: '#666',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'bottom',
    textOverflow: 'ellipsis',
    overflowY: 'unset',
  },
}));

const MinimalResultsViewerComponent: React.FC<any> = (props): ReactElement => {
  const classes = useStyles()
  const {results, rows, start, stringInput, typeDef} = props
  const {searchFields, sortFields, url} = gettingstarted
  const query = {searchFields, sortFields, url, start, rows, typeDef, stringInput}

  const renderValue = (field, doc) => {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  return (
    <SolrResponseProvider query={query}>
      <Pagination/>
      <SearchBox/>
      <Grid
        style={{padding: 20}}
        item xs={12}
      >
        <GridList cellHeight={160} className={classes.gridList} cols={1}>
            {results && Object.keys(results).length && results.docs && results.docs.map((doc, i) => (
              <GridListTile key={i} cols={1}>
                {searchFields.filter((field) => field.field !== "*").map((field, i) =>
                    <li key={i}>
                      <label style={{margin: "0 20px 0 0", width: 120}}>{field.label || field.field}</label>
                      {renderValue(field.field, doc)}
                    </li>
                  )}
              </GridListTile>
            ))}
        </GridList>
      </Grid>
    </SolrResponseProvider>
  );
}

const pageStrategy = "paginate"

const mapStateToProps = (state): any => ({
  query: state.query,
  rows: state.query.rows ? state.query.rows: 20,
  stringInput: state.query.stringInput,
  typeDef: state.query.typeDef,
  searchFields: state.query && state.query.searchFields,
  start: state.query.start ? pageStrategy === "paginate" ? state.query.start : 0 : 0,
  results: state.response
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


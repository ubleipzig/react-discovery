import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
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
  content: {
    flex: '1 0 auto',
    padding: 0
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
      <SearchBox/>
      <Pagination/>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper/>
        </Grid>
        <Grid
          style={{padding: 20}}
          item xs={9}
        >
            {Object.keys(results).length && results.docs && results.docs.map((doc, i) => (
              <Card key={i}>
                {searchFields.map((field, i) =>
                    <CardContent  className={classes.content} key={i}>
                      <label style={{margin: "0 20px 0 0", width: 120}}>{field.label || field.field}</label>
                      {renderValue(field.field, doc)}
                    </CardContent>
                  )}
              </Card>
            ))}
        </Grid>
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


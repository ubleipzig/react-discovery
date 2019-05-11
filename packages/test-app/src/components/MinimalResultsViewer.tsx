import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {fetchSolrResponseWorker, setQueryFields, IHits, SolrResponseProvider} from 'solr-react-faceted-search'
import {gettingstarted} from "../config"
import {ItemList, ItemListComponent, Pagination, SearchBox} from '.'

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
    padding: 0,
    display: 'flex'
  },
  inline: {
    display: 'inline',
  },
}));

interface IMinimalResultsViewer {
  aggregations: {}
  hits: IHits
  size: number
  start: number
  stringInput: string
  typeDef: string
}

const MinimalResultsViewerComponent: React.FC<any> = (props: IMinimalResultsViewer): ReactElement => {
  const classes = useStyles()
  const {aggregations, hits, size, start, stringInput, typeDef} = props
  const {searchFields, sortFields, url} = gettingstarted
  const rows = size
  const query = {searchFields, sortFields, url, start, rows, typeDef, stringInput}

  const renderValue = (field, hit) => {
    const value = [].concat(hit[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

  const buildHits = (): JSX.Element[] => {
     return hits.hits && hits.hits.map((hit, i) => (
      <Card key={i}>
        {searchFields.map((field, i) =>
          <CardContent  className={classes.content} key={i}>
            <div style={{margin: "0 20px 0 0", width: 120}}>
              <Typography component="span">
                {field.label || field.field}
              </Typography>
            </div>
            <div style={{flex: 'auto'}}>
              <Typography color="textSecondary" className={classes.inline} component="span">
                {renderValue(field.field, hit)}
              </Typography>
            </div>
          </CardContent>
        )}
      </Card>
     ))}

  return (
    <SolrResponseProvider query={query}>
      <SearchBox/>
      <Pagination/>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <ItemListComponent
            aggregation={aggregations && aggregations["characteristics_ss"]}
            itemComponent={ItemList}/>
        </Grid>
        <Grid
          style={{padding: 20}}
          item xs={10}
        >
          {hits ? buildHits(): "Loading"}
        </Grid>
      </Grid>
    </SolrResponseProvider>
  )
}

MinimalResultsViewerComponent.defaultProps = {
  size: 20,
  start: 0
}

const mapStateToProps = (state): any => ({
  query: state.query,
  size: state.query.size,
  stringInput: state.query.stringInput,
  typeDef: state.query.typeDef,
  searchFields: state.query && state.query.searchFields,
  start: state.query.start,
  hits: state.response.hits,
  aggregations: state.response.aggregations
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


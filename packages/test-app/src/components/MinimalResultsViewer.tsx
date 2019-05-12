import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {fetchSolrResponseWorker, setQueryFields, IHits, SolrResponseProvider} from 'solr-react-faceted-search'
import {gettingstarted} from "../config"
import {ItemList, Hits, Pagination, SearchBox} from '.'

interface IMinimalResultsViewer {
  hits: IHits;
  size: number;
  start: number;
  stringInput: string;
  typeDef: string;
}

const MinimalResultsViewerComponent: React.FC<any> = (props: IMinimalResultsViewer): ReactElement => {
  const {hits, size, start, stringInput, typeDef} = props
  const {searchFields, sortFields, url} = gettingstarted
  const query = {searchFields, sortFields, url, start, size, typeDef, stringInput}

  return (
    <SolrResponseProvider query={query}>
      <SearchBox/>
      <Pagination/>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <ItemList
            field={"characteristics_ss"}
            label={"Characteristics"}
            itemComponent={ItemList}/>
        </Grid>
        <Grid
          style={{padding: 20}}
          item xs={10}
        >
          {hits ? <Hits/> : "Loading"}
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
  start: state.query.start,
  hits: state.response.hits,
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


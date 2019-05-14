import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {fetchSolrResponseWorker, setQueryFields, IHits, SolrResponseProvider} from 'solr-react-faceted-search'
import {localConfig} from "../config"
import {GroupSelectedFilters, Hits, ItemList, Pagination, SearchBox} from '.'

interface IMinimalResultsViewer {
  filters: string[];
  hits: IHits;
  size: number;
  start: number;
  stringInput: string;
  typeDef: string;
}

const MinimalResultsViewerComponent: React.FC<any> = (props: IMinimalResultsViewer): ReactElement => {
  const {filters, hits, size, start, stringInput, typeDef} = props
  const {collections, currentCollection} = localConfig
  const {searchFields, sortFields, url} = collections[currentCollection]
  const query = {filters, searchFields, sortFields, url, start, size, typeDef, stringInput}

  return (
    <SolrResponseProvider query={query}>
      <SearchBox/>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <ItemList
            field={"schreibsprachen_0_.name"}
            label={"Language"}
            itemComponent={ItemList}/>
          <ItemList
            field={"entstehungsDaten_0_.entstehungsort.name"}
            label={"Place"}
            itemComponent={ItemList}/>
          <ItemList
            field={"stoffe_0_.name"}
            label={"Material"}
            itemComponent={ItemList}/>
        </Grid>
        <Grid
          item xs={10}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Pagination/>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <GroupSelectedFilters/>
          </Grid>
          <Grid
            style={{padding: 20}}
          >
            {hits ? <Hits/> : "Loading"}
          </Grid>
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
  filters: state.query.filters,
  query: state.query,
  size: state.query.size,
  stringInput: state.query.stringInput,
  typeDef: state.query.typeDef,
  start: state.query.start,
  hits: state.response.hits,
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


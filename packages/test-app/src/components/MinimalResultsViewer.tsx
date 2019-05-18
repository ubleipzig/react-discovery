import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {
  fetchSolrResponseWorker,
  IHits,
  IQuery,
  ISearchField,
  ISortField,
  setQueryFields,
  SolrResponseProvider
} from 'solr-react-faceted-search'
import {localConfig} from "../config"
import {GroupSelectedFilters, Hits, HitStats, ItemList, Pagination, SearchAppBar, SortingSelector, Suggester} from '.'
import {Typography} from "@material-ui/core"

interface IMinimalResultsViewer {
  filters: string[];
  highlighting: boolean;
  hits: IHits;
  size: number;
  searchFields: ISearchField[];
  sortFields: ISortField[];
  start: number;
  stringInput: string;
  suggest: boolean;
  suggestDictionary: string;
  typeDef: string;
  url: string;
}

const MinimalResultsViewerComponent: React.FC<any> = (props: IMinimalResultsViewer): ReactElement => {
  const {filters, highlighting, hits, searchFields, size, sortFields, start, stringInput, suggest, suggestDictionary, typeDef, url} = props
  const {collections, currentCollection} = localConfig
  const {refinementListFilters} = collections[currentCollection]

  const buildInitialQuery = (): IQuery => {
    return {filters, highlighting, searchFields, size, sortFields, start, stringInput, suggest, suggestDictionary, typeDef, url}
  }

  const buildRefinementListFilters = (): any => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemList
        field={refinementListFilters[id].field}
        itemComponent={ItemList}
        key={id}
        label={refinementListFilters[id].label}/>))
  }

  return (
    <SolrResponseProvider query={buildInitialQuery()}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchAppBar/>
        </Grid>
        <Grid
          item style={{backgroundColor: 'whitesmoke', marginTop: '50px'}}
          xs={2}
        >
          <Suggester/>
          {buildRefinementListFilters()}
        </Grid>
        <Grid
          item xs={10}
        >
          <Grid
            container
            direction="row"
            style={{marginTop: '50px'}}
          >
            <HitStats/>
            <SortingSelector/>
          </Grid>
          <Grid
            container
            direction="row"
          >
            <GroupSelectedFilters/>
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <Pagination/>
          </Grid>
          <Grid
            style={{backgroundColor: 'lightgray', padding: 20}}
          >
            {hits ? <Hits/> : <Typography>Loading</Typography>}
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <Pagination/>
          </Grid>
        </Grid>
      </Grid>
    </SolrResponseProvider>
  )
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters,
  highlighting: state.query.highlighting,
  hits: state.response.hits,
  query: state.query,
  searchFields: state.query.searchFields,
  size: state.query.size,
  sortFields: state.query.sortFields,
  start: state.query.start,
  stringInput: state.query.stringInput,
  suggest: state.query.suggest,
  suggestDictionary: state.query.suggestDictionary,
  typeDef: state.query.typeDef,
  url: state.query.url
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)

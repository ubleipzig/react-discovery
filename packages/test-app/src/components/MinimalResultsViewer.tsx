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
import {GroupSelectedFilters, Hits, HitStats, ItemList, Pagination, SearchBox, SortingSelector, Suggester} from '.'
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
    return {filters, highlighting, searchFields, size, sortFields, start, stringInput, suggest, typeDef, suggestDictionary, url}
  }

  const buildRefinementListFilters = (): any => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemList
        key={id}
        field={refinementListFilters[id].field}
        label={refinementListFilters[id].label}
        itemComponent={ItemList}/>))
  }

  return (
    <SolrResponseProvider query={buildInitialQuery()}>
      <SearchBox/>
      <Suggester/>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          {buildRefinementListFilters()}
        </Grid>
        <Grid
          item xs={10}
        >
          <Grid
            container
            direction="row"
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
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Pagination/>
          </Grid>
          <Grid
            style={{backgroundColor: 'lightgray', padding: 20}}
          >
            {hits ? <Hits/> : <Typography>Loading</Typography>}
          </Grid>
        </Grid>
      </Grid>
    </SolrResponseProvider>
  )
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters,
  highlighting: state.query.highlighting,
  query: state.query,
  size: state.query.size,
  searchFields: state.query.searchFields,
  sortFields: state.query.sortFields,
  stringInput: state.query.stringInput,
  suggest: state.query.suggest,
  suggestDictionary: state.query.suggestDictionary,
  typeDef: state.query.typeDef,
  start: state.query.start,
  hits: state.response.hits,
  url: state.query.url
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


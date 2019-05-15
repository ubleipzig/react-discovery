import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {fetchSolrResponseWorker, setQueryFields, IHits, SolrResponseProvider, IQuery} from 'solr-react-faceted-search'
import {ISortField, localConfig} from "../config"
import {GroupSelectedFilters, Hits, HitStats, ItemList, Pagination, SearchBox, SortingSelector} from '.'
import {Typography} from "@material-ui/core"

interface IMinimalResultsViewer {
  filters: string[];
  hits: IHits;
  size: number;
  newSortFields: ISortField[];
  start: number;
  stringInput: string;
  typeDef: string;
}

const MinimalResultsViewerComponent: React.FC<any> = (props: IMinimalResultsViewer): ReactElement => {
  const {filters, hits, size, newSortFields, start, stringInput, typeDef} = props
  const {collections, currentCollection, highlighting} = localConfig
  const {refinementListFilters, searchFields, sortFields, url} = collections[currentCollection]

  const buildInitialQuery = (): IQuery => {
    let query
    const selectedSortFields = newSortFields && newSortFields.length && newSortFields.filter((field): boolean => 'isSelected' in field)
    if (selectedSortFields && selectedSortFields.length) {
      query = {filters, highlighting, searchFields, sortFields: newSortFields, url, start, size, typeDef, stringInput}
    } else {
      query = {filters, highlighting, searchFields, sortFields, url, start, size, typeDef, stringInput}
    }
    return query
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

MinimalResultsViewerComponent.defaultProps = {
  size: 20,
  start: 0
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters,
  query: state.query,
  size: state.query.size,
  newSortFields: state.query.sortFields,
  stringInput: state.query.stringInput,
  typeDef: state.query.typeDef,
  start: state.query.start,
  hits: state.response.hits,
})
const mapDispatchToProps = {fetchSolrResponseWorker, setQueryFields}

export const MinimalResultsViewer = connect(mapStateToProps, mapDispatchToProps)(MinimalResultsViewerComponent)


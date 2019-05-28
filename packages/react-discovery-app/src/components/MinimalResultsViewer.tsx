import {FacetViewSwitcher, GroupSelectedFilters, HitStats, ItemList, Pagination,
  SearchAppBar, SortingSelector, Suggester, TabsAppBar, ViewSwitcherToggle} from '.'
import {
  IFilters,
  IHits,
  IQuery,
  ISearchField,
  ISortField,
  SolrResponseProvider,
} from '@react-discovery/solr'
import React, {ReactElement} from 'react'
import Grid from '@material-ui/core/Grid'
import {Typography} from "@material-ui/core"
import {useSelector} from 'react-redux'

export const MinimalResultsViewer: React.FC<any> = (): ReactElement => {
  const filters = useSelector((state: any): IFilters => state.query.filters)
  const highlighting = useSelector((state: any): boolean => state.query.highlighting)
  const hits = useSelector((state: any): IHits => state.response.hits)
  const refinementListFilters = useSelector((state: any): any =>
    state.config.collections[state.config.currentCollection].refinementListFilters)
  const searchFields = useSelector((state: any): ISearchField[] => state.query.searchFields)
  const size = useSelector((state: any): number => state.query.size)
  const sortFields = useSelector((state: any): ISortField[] => state.query.sortFields)
  const start = useSelector((state: any): number => state.query.start)
  const stringInput = useSelector((state: any): string => state.query.stringInput)
  const suggest = useSelector((state: any): boolean => state.query.suggest)
  const suggestDictionary = useSelector((state: any): string => state.query.suggestDictionary)
  const typeDef = useSelector((state: any): string => state.query.typeDef)
  const url = useSelector((state: any): string => state.query.url)

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
      <Grid container>
        <Grid item xs={12}>
          <SearchAppBar/>
        </Grid>
        <Grid
          item style={{backgroundColor: 'whitesmoke', marginTop: '50px', padding: '10px'}}
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
            style={{marginTop: '50px', padding: '10px'}}
          >
            <HitStats/>
            <ViewSwitcherToggle/>
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
            {hits ?
              <>
                <TabsAppBar/>
                <FacetViewSwitcher/>
              </> : <Typography>Loading</Typography>}
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

import {FacetViewSwitcher, GroupSelectedFilters, HitStats, ItemList, Pagination,
  SearchAppBar, SortingSelector, Suggester, TabsAppBar, ViewSwitcherToggle} from '.'
import {
  IQuery,
  SolrResponseProvider,
  getCurrentLanguage,
  getHits,
  getInitialQuery,
  getRefinementListFilters,
  usePrevious,
} from '@react-discovery/solr'
import React, {ReactElement, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {Typography} from "@material-ui/core"
import {useTranslation} from "react-i18next"

export const MinimalResultsViewer: React.FC<any> = (): ReactElement => {
  const {t, i18n} = useTranslation()
  const currentLanguage = getCurrentLanguage()
  const previousLanguage = usePrevious(currentLanguage)

  useEffect((): void => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  const hits = getHits()
  const refinementListFilters = getRefinementListFilters()

  const initialQuery: IQuery = getInitialQuery()

  const buildRefinementListFilters = (): ReactElement[] => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemList
        field={refinementListFilters[id].field}
        itemComponent={ItemList}
        key={id}
        label={t(refinementListFilters[id].label)}/>))
  }

  return (
    <SolrResponseProvider query={initialQuery}>
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
            style={{alignItems: 'center', marginTop: '50px', padding: '10px'}}
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

import {FacetViewSwitcher, GroupSelectedFilters, HitStats, Pagination, RefinementListFilters,
  SearchAppBar, SortingSelector, Suggester, TabsAppBar, ViewSwitcherToggle} from '.'
import {
  IQuery,
  SolrResponseProvider,
  getCurrentLanguage,
  getHits,
  getInitialQuery,
  usePrevious,
} from '@react-discovery/solr'
import React, {ReactElement, useEffect} from 'react'
import {Theme, createStyles, makeStyles} from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const MinimalResultsViewer: React.FC<any> = (): ReactElement => {
  const {i18n} = useTranslation(['common', 'vocab'])
  const classes: any = useStyles({})
  const currentLanguage = getCurrentLanguage()
  const previousLanguage = usePrevious(currentLanguage)

  useEffect((): void => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  const hits = getHits()
  const initialQuery: IQuery = getInitialQuery()

  return (
    <SolrResponseProvider query={initialQuery}>
      <Grid container>
        <Grid item xs={12}>
          <SearchAppBar/>
        </Grid>
        <Grid
          item
          style={{backgroundColor: 'whitesmoke', marginTop: '50px', padding: '10px'}}
          xs={2}
        >
          <Suggester/>
          <RefinementListFilters/>
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
              </> : <CircularProgress className={classes.progress}/>}
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

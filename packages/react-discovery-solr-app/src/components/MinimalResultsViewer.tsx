import {CircularProgress, Grid, useMediaQuery} from '@material-ui/core'
import {FacetViewSwitcher, MinWidthResultsGrid, SearchAppBar} from '.'
import React, {ReactElement, useEffect} from 'react'
import {
  GroupSelectedFilters,
  HitStats,
  RefinementListFilters,
  Solr,
  SortingSelector,
  Suggester,
  TabsAppBar,
  useMinimalResultViewerStyles
} from '@react-discovery/components'
import {SolrCore, usePrevious} from '@react-discovery/core'
import {getCurrentLanguage} from "@react-discovery/configuration"
import {useTranslation} from "react-i18next"

export const MinimalResultsViewer: React.FC<any> = (): ReactElement => {
  const {i18n} = useTranslation(['common', 'vocab'])
  const classes: any = useMinimalResultViewerStyles({})
  const currentLanguage = getCurrentLanguage()
  const previousLanguage = usePrevious(currentLanguage)
  const matches = useMediaQuery('(min-width:600px)')

  useEffect((): void => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  const hits = SolrCore.state.getHits()

  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchAppBar/>
      </Grid>
      {matches ? <Grid
        className={classes.gridLeft}
        item
        xs={2}
      >
        <Suggester/>
        <RefinementListFilters/>
      </Grid> : null}
      {matches ?
        <Grid
          item xs={10}
        >
          <Grid
            className={classes.gridActions}
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
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <Solr.Pagination/>
          </Grid>
          <Grid
            className={classes.gridContent}
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
            <Solr.Pagination/>
          </Grid>
        </Grid> :
        <MinWidthResultsGrid/>
      }
    </Grid>
  )
}

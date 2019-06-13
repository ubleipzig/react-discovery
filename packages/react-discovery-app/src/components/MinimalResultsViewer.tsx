import {FacetViewSwitcher, GroupSelectedFilters, HitStats, MinWidthResultsGrid, Pagination, RefinementListFilters,
  SearchAppBar, SortingSelector, Suggester, TabsAppBar} from '.'
import React, {ReactElement, useEffect} from 'react'
import {Theme, createStyles, makeStyles, useMediaQuery} from "@material-ui/core"
import {
  getCurrentLanguage,
  getHits,
  usePrevious,
} from '@react-discovery/solr'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    gridActions: {
      alignItems: 'center',
      marginTop: '50px',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    gridLeft: {
      backgroundColor: 'whitesmoke',
      marginTop: '50px',
      padding: '10px'
    },
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
  const matches = useMediaQuery('(min-width:600px)')
  useEffect((): void => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  const hits = getHits()

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
            <Pagination/>
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
            <Pagination/>
          </Grid>
        </Grid> :
        <MinWidthResultsGrid/>
      }
    </Grid>
  )
}

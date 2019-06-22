import {CircularProgress, Grid, useMediaQuery} from '@material-ui/core'
import {
  ES,
  HitStats,
  useMinimalResultViewerStyles
} from '@react-discovery/components'
import {ESCore, usePrevious} from '@react-discovery/core'
import {FacetViewSwitcher, MinWidthResultsGrid, SearchAppBar} from '.'
import React, {ReactElement, useEffect} from 'react'
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

  const hits = ESCore.state.getHits()

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
          </Grid>
          <Grid
            container
            direction="row"
          >
            <ES.Pagination/>
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
          </Grid>
          <Grid
            className={classes.gridContent}
          >
            {hits ?
              <>
                <FacetViewSwitcher/>
              </> : <CircularProgress className={classes.progress}/>}
          </Grid>
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
          </Grid>
        </Grid> :
        <MinWidthResultsGrid/>
      }
    </Grid>
  )
}

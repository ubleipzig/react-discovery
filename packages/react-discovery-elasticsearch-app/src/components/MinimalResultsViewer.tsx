import {CircularProgress, Grid, makeStyles, useMediaQuery} from '@material-ui/core'
import {ESCore, usePrevious} from '@react-discovery/core'
import {FacetViewSwitcher, MinWidthResultsGrid} from '.'
import React, {ReactElement, useEffect} from 'react'
import {RefinementListFilters, useMinimalResultViewerStyles} from '@react-discovery/components'
import {AppControlGrid} from "./AppControlGrid"
import {getCurrentLanguage} from "@react-discovery/configuration"
import {useTranslation} from "react-i18next"

export const useStyles = makeStyles((): any => ({
  main: {
    display: 'flex'
  },
}))

export const MinimalResultsViewer: React.FC<any> = (): ReactElement => {
  const {i18n} = useTranslation(['common', 'vocab'])
  const classes: any = useMinimalResultViewerStyles({})
  const mainClasses: any = useStyles({})
  const currentLanguage = getCurrentLanguage()
  const previousLanguage = usePrevious(currentLanguage)
  const matches = useMediaQuery('(min-width:600px)')

  useEffect((): any => {
    if (previousLanguage !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18n, previousLanguage])

  const hits = ESCore.state.getHits()

  return (
    <Grid container>
      <AppControlGrid/>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="center"
      >
        <Grid
          className={mainClasses.main}
          item
          xs={10}
        >
          {matches ?
            <Grid
              className={classes.gridLeft}
              item
              xs={2}
            >
              <RefinementListFilters/>
            </Grid> : null
          }
          {matches ?
            <Grid
              item
              style={{marginTop: 280}}
              xs={8}
            >
              <Grid
                className={classes.gridContent}
              >
                {hits ?
                  <>
                    <FacetViewSwitcher/>
                  </> : <CircularProgress className={classes.progress}/>}
              </Grid>
            </Grid> :
            <MinWidthResultsGrid/>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

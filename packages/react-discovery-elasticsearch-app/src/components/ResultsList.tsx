import {CircularProgress, Grid, makeStyles, useMediaQuery} from '@material-ui/core'
import {
  ES,
  HitStats,
  ViewSwitcherToggle,
  useMinimalResultViewerStyles,
} from '@react-discovery/components'
import {ESCore, usePrevious} from '@react-discovery/core'
import {FacetViewSwitcher, ListFilters, MinWidthResultsGrid} from '.'
import React, {ReactElement, useEffect} from 'react'
import {getCurrentLanguage} from "@react-discovery/configuration"
import {useTranslation} from "react-i18next"

export const useStyles = makeStyles((): any => ({
  gridActions: {
    alignItems: 'center',
    padding: '10px'
  },
  main: {
    display: 'flex',
    padding: 20,
  },
}))

export const ResultsList: React.FC<any> = (): ReactElement => {
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
    matches ?
      <>
        {hits ?
          <>
            <Grid
              className={mainClasses.gridActions}
              container
              direction="row"
            >
              <HitStats/>
              <ViewSwitcherToggle/>
              <ES.Pagination/>
            </Grid>
            <ListFilters/>
            <FacetViewSwitcher/>
          </> : <CircularProgress className={classes.progress}/>
        }
      </> : <MinWidthResultsGrid/>
  )
}

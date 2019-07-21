import {CircularProgress, Grid, makeStyles, useMediaQuery} from '@material-ui/core'
import {
  ES,
  HitStats,
  ViewSwitcherToggle,
  useMinimalResultViewerStyles,
} from '@react-discovery/components'
import {ESCore, usePrevious} from '@react-discovery/core'
import {FacetViewSwitcher, ListFilters, MinWidthResultsGrid, PersistentDrawer, SearchAppBar} from '.'
import React, {ReactElement, useEffect} from 'react'
import classNames from 'classnames'
import {getCurrentLanguage} from "@react-discovery/configuration"
import {useTranslation} from "react-i18next"

const drawerWidth = 240
export const useStyles = makeStyles((theme): any => ({
  content: {
    backgroundColor: '#fafafa',
    flexGrow: 1,
    marginLeft: drawerWidth,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  contentShift: {
    backgroundColor: '#fafafa',
    marginLeft: 73,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
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

  const [open, setOpen] = React.useState(true)

  const handleDrawerChange = (): void => {
    setOpen(!open)
  }

  const hits = ESCore.state.getHits()

  return (
    <Grid container>
      <SearchAppBar
        handleDrawerChange={handleDrawerChange}
      />
      <Grid
        item
        xs={12}
      >
        <PersistentDrawer open={open}/>
        {matches ?
          <main
            className={classNames({[mainClasses.content]: open}, {
              [mainClasses.contentShift]: !open,
            })}
          >
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
            </>
          </main> : <MinWidthResultsGrid/>
        }
      </Grid>
    </Grid>
  )
}

import {AppBar, Grid, makeStyles} from "@material-ui/core"
import {ES, GroupSelectedFilters, HitStats, SearchBox, ViewSwitcherToggle} from "@react-discovery/components"
import React, {ReactElement, useEffect} from "react"
import {ContextActionTabs} from "./ContextActionTabs"
import {SearchAppBar} from "./SearchAppBar"
import {usePrevious} from "@react-discovery/core"
import {useScrollYPosition} from "../utils"

export const useStyles = makeStyles((theme): any => ({
  gridActions: {
    alignItems: 'center',
    padding: '10px'
  },
  grow: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: 100
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export const AppControlGrid: React.FC<any> = (): ReactElement => {
  const appBarClasses: any = useStyles({})
  const scrollY = useScrollYPosition()
  const prevScrollY = usePrevious(scrollY)
  const [visible, setVisible] = React.useState(true)

  useEffect((): any => {
    if (prevScrollY < scrollY) {
      setVisible(false)
    } else if (prevScrollY > scrollY) {
      setVisible(true)
    }
  }, [visible, scrollY, prevScrollY])

  return (
    <Grid className={appBarClasses.grow} item xs={12} >
      <SearchAppBar/>
      {
        visible ?
          <Grid
            alignItems="center"
            container
            direction="row"
            justify="center"
          >
            <Grid
              item
              xs={10}
            >
              <AppBar
                color="default"
                position="static"
              >
                <ContextActionTabs/>
                <SearchBox/>
                <Grid
                  className={appBarClasses.gridActions}
                  container
                  direction="row"
                >
                  <HitStats/>
                  <ViewSwitcherToggle/>
                  <ES.Pagination/>
                </Grid>
                <Grid
                  container
                  direction="row"
                >
                  <GroupSelectedFilters/>
                </Grid>
              </AppBar>
            </Grid>
          </Grid> : null
      }
    </Grid>
  )
}

import {CircularProgress, Grid} from "@material-ui/core"
import {
  GroupSelectedFilters,
  HitStats,
  Pagination,
  SortingSelector,
  TabsAppBar,
  useMinWidthResultsGridStyles
} from "@react-discovery/components"
import React, {ReactElement} from "react"
import {FacetViewSwitcher} from "."
import {getHits} from "@react-discovery/elasticsearch"

export const MinWidthResultsGrid: React.FC<any> = (): ReactElement => {
  const classes: any = useMinWidthResultsGridStyles({})
  const hits = getHits()
  return (
    <Grid
      item xs={12}
    >
      <Grid
        className={classes.gridActions}
        container
        direction="row"
      >
      </Grid>
      <Grid
        container
        direction="row"
      >
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
      </Grid>
    </Grid>
  )
}

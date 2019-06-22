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
import {SolrCore} from "@react-discovery/core"

export const MinWidthResultsGrid: React.FC<any> = (): ReactElement => {
  const classes: any = useMinWidthResultsGridStyles({})
  const hits = SolrCore.state.getHits()
  return (
    <Grid
      item xs={12}
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
    </Grid>
  )
}

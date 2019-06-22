import {CircularProgress, Grid} from "@material-ui/core"
import React, {ReactElement} from "react"
import {
  TabsAppBar,
  useMinWidthResultsGridStyles
} from "@react-discovery/components"
import {ESCore} from "@react-discovery/core"
import {FacetViewSwitcher} from "."

export const MinWidthResultsGrid: React.FC<any> = (): ReactElement => {
  const classes: any = useMinWidthResultsGridStyles({})
  const hits = ESCore.state.getHits()
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

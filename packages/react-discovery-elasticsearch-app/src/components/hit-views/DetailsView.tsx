import {Grid, Theme, createStyles, makeStyles} from "@material-ui/core"
import React, {ReactElement, useEffect, useState} from "react"
import {ESCore, usePrevious} from "@react-discovery/core"
import DefaultHitComponent from "./DefaultHitComponent"
import {SearchAppBar} from '..'
import {getTypeForId} from '@react-discovery/components'
import {useDispatch} from "react-redux"

interface IDetailsView {
  id: string;
}

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
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const DetailsView: React.FC<IDetailsView> = (props): ReactElement => {
  const {id} = props
  const stringInput = ESCore.state.getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const [isInitialized, setIsInitialized] = useState(false)
  const hits = ESCore.state.getHits()
  const hit = hits && hits.hits.length ? hits.hits[0] : null
  const dispatch = useDispatch()

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(ESCore.state.setQueryInput({stringInput: id}))
      setIsInitialized(true)
    } else if (prevStringInput !== stringInput) {
      dispatch(ESCore.state.setQueryInput({stringInput: id}))
    }
  })
  const lClasses: any = useStyles({})
  const type = hit && getTypeForId(hit, id)

  const buildObjectForType = (type): ReactElement => {
    switch (type) {
      default:
        return (<DefaultHitComponent
          hit={hit}
        />)
    }
  }

  return <Grid container>
    <Grid item xs={12}>
      <SearchAppBar/>
    </Grid>
    <Grid
      item xs={12}
    >
      <Grid
        className={lClasses.gridActions}
        container
        direction="row"
      >
      </Grid>
      {hit && type ?
        buildObjectForType(type) : null}
    </Grid>
  </Grid>
}

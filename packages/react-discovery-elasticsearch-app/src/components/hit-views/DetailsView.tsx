import {ESCore, usePrevious} from "@react-discovery/core"
import {MinWidthResultsGrid, PersistentDrawer, SearchAppBar} from '..'
import React, {ReactElement, useEffect, useState} from "react"
import {DetailBreadcrumbs} from "."
import DefaultHitComponent from './DefaultHitComponent'
import {createStyles, Grid, makeStyles, Theme, useMediaQuery} from "@material-ui/core"
import {getTypeForId} from '@react-discovery/components'
import classNames from 'classnames'
import {useDispatch} from "react-redux"

interface IDetailsView {
  id: string;
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    content: {
      flexGrow: 1,
      marginLeft: drawerWidth,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    contentShift: {
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
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    main: {
      backgroundColor: 'lightgray',
      display: 'flex',
      padding: 20
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const DetailsView: React.FC<IDetailsView> = (props): ReactElement => {
  const {id} = props
  const classes: any = useStyles({})
  const stringInput = ESCore.state.getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const [isInitialized, setIsInitialized] = useState(false)
  const hits = ESCore.state.getHits()
  const hit = hits && hits.hits.length ? hits.hits[0] : null
  const dispatch = useDispatch()
  const matches = useMediaQuery('(min-width:600px)')

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

  const [open, setOpen] = React.useState(true)

  const handleDrawerChange = (): void => {
    setOpen(!open)
  }

  const buildObjectForType = (type): ReactElement => {
    switch (type) {
      default:
        return (<DefaultHitComponent
          hit={hit}
        />)
    }
  }

  return (
    <Grid container>
      <SearchAppBar
        handleDrawerChange={handleDrawerChange}
        open={open}/>
      <Grid
        item
        xs={12}
      >
        <PersistentDrawer open={open}/>
        {matches ?
          <main
            className={classNames({[classes.content]: open}, {
              [classes.contentShift]: !open,
            })}
          >
            <Grid
              className={lClasses.gridActions}
              container
              direction="row"
            >
              <DetailBreadcrumbs/>
            </Grid>
            {hit && type ?
              buildObjectForType(type) : null
            }
          </main> : <MinWidthResultsGrid/>
        }
      </Grid>
    </Grid>)
}

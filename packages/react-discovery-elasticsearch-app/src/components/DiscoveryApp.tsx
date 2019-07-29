import {Grid, Theme, createStyles, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {PersistentDrawer} from "./PersistentDrawer"
import {SearchAppBar} from "./SearchAppBar"
import classNames from 'classnames'

interface IDiscoveryApp {
  component: ReactElement;
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
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
      height: '100%',
      marginLeft: 73,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  }))

export const DiscoveryApp: React.FC<IDiscoveryApp> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {component} = props
  const [open, setOpen] = React.useState(false)

  const handleDrawerChange = (): void => {
    setOpen(!open)
  }

  return (
    <Grid container>
      <SearchAppBar
        handleDrawerChange={handleDrawerChange}/>
      <Grid
        item
        style={{height: '100vh'}}
        xs={12}
      >
        <PersistentDrawer open={open}/>
        <main
          className={classNames({[classes.content]: open}, {
            [classes.contentShift]: !open,
          })}
        >
          {component}
        </main>
      </Grid>
    </Grid>
  )
}

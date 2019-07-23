import {AppBar, Badge, IconButton, Typography, makeStyles} from '@material-ui/core'
import {Bookmark, Menu} from '@material-ui/icons'
import {
  LanguageSelectionMenu,
  ProfileMenu,
  ResetButton, SearchBox,
} from '@react-discovery/components'
import React, {ReactElement} from 'react'
import {Domain} from "@react-discovery/views"

export const useSearchAppBarStyles = makeStyles((theme): any => ({
  appBar: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    paddingRight: 48,
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    height: 56,
    padding: '0 24px',
    position: 'relative',
    width: '100%'
  }
}))

export const SearchAppBar: React.FC<any> = (props): ReactElement => {
  const classes: any = useSearchAppBarStyles({})
  const {handleDrawerChange} = props

  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
    >
      <div
        className={classes.toolbar}
      >
        <IconButton
          className={classes.menuButton}
          color="inherit"
          edge="start"
          href=''
          onClick={handleDrawerChange}
        >
          <Menu />
        </IconButton>
        <Typography
          className={classes.title}
          noWrap
          variant="subtitle2"
        >
          {Domain.APP_NAME}
        </Typography>
        <SearchBox/>
        <div className={classes.sectionDesktop}>
          <ResetButton/>
          <LanguageSelectionMenu/>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            href=''
          >
            <Badge
              badgeContent={4}
              color="secondary"
            >
              <Bookmark/>
            </Badge>
          </IconButton>
          <ProfileMenu/>
        </div>
      </div>
    </AppBar>
  )
}


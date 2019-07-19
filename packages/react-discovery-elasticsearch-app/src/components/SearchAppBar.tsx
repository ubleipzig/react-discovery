import {AppBar, Badge, IconButton, Toolbar, Typography, makeStyles} from '@material-ui/core'
import {Bookmark, Menu} from '@material-ui/icons'
import {
  IOverridableStyledComponent,
  LanguageSelectionMenu,
  ProfileMenu,
  ResetButton,
  SearchSettingsMenu,
} from '@react-discovery/components'
import React, {ReactElement} from 'react'

export const useSearchAppBarStyles = makeStyles((theme): any => ({
  colorPrimary: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
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
}))

export const SearchAppBar: React.FC<IOverridableStyledComponent> = (): ReactElement => {
  const classes: any = useSearchAppBarStyles({})

  return (
    <AppBar
      className={classes.colorPrimary}
      position="static"
    >
      <Toolbar
        variant="dense"
      >
        <IconButton
          aria-label="Open drawer"
          className={classes.menuButton}
          color="inherit"
          edge="start"
          href=''
        >
          <Menu />
        </IconButton>
        <Typography
          className={classes.title}
          noWrap
          style={{width: '100%'}}
          variant="subtitle2"
        >
          Discovery App
        </Typography>
        <div className={classes.sectionDesktop}>
          <ResetButton/>
          <SearchSettingsMenu/>
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
      </Toolbar>
    </AppBar>
  )
}


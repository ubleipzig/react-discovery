import React, {ReactElement} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {SearchBox} from '.'

const useStyles = makeStyles((theme): any => ({
  colorPrimary: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
  },
  grow: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: '1000'
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
}));

export const SearchAppBar: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget);
  }

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuOpen = (event): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      <MenuItem
        button={true}
        component='div'
        onClick={handleMenuClose}
      >Profile
      </MenuItem>
      <MenuItem
        button={true}
        component='div'
        onClick={handleMenuClose}
      >
        My account
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu: ReactElement = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        button={true}
        component='div'>
        <IconButton
          href=''
          color="inherit"
        >
          <Badge
            badgeContent={4}
            color="secondary"
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem
        button={true}
        component='div'
      >
        <IconButton
          href=''
          color="inherit"
        >
          <Badge
            badgeContent={11}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        button={true}
        component='div'
        onClick={handleProfileMenuOpen}
      >
        <IconButton
          href=''
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        className={classes.colorPrimary}
        position="static"
      >
        <Toolbar
          variant="dense"
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            href=''
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="subtitle2" noWrap
          >
            Discovery App
          </Typography>
          <SearchBox/>
          <div className={classes.sectionDesktop}>
            <IconButton
              href=''
              color="inherit"
            >
              <Badge
                badgeContent={4}
                color="secondary"
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              href=''
              color="inherit"
            >
              <Badge
                badgeContent={17}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              href=''
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              href=''
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
}


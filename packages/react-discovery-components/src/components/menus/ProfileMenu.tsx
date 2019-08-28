import {IconButton, Menu, MenuItem, makeStyles} from "@material-ui/core"
import React, {ReactElement, useEffect} from "react"
import {AccountCircle} from "@material-ui/icons"
import {setCurrentUser} from '@react-discovery/configuration'
import {useDispatch} from "react-redux"
import {useFirebaseAuth} from '@use-firebase/auth'
import {useTranslation} from "react-i18next"

const useStyles = makeStyles(() => ({
  avatar: {
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
    height: 36,
    width: 36,
    zIndex: 400,
  },
  error: {},
  input: {
    display: 'none',
  },
}))

export const ProfileMenu: React.FC<any> = (): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles({});
  const {user, signOut} = useFirebaseAuth()
  const {displayName, photoURL} = user
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()
  const {t} = useTranslation()

  useEffect((): void => {
    if (user) {
      dispatch(setCurrentUser({currentUser: user}))
    }
  }, [dispatch, user])

  const handleProfileMenuOpen = (event: any): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
    >
      <MenuItem
        button={true}
        component='div'
        onClick={handleMenuClose}
      >{t('profile')}
      </MenuItem>
      <MenuItem
        button={true}
        component='div'
        onClick={signOut}
      >
        {t('signout')}
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
        color="inherit"
        edge="end"
        href=''
        onClick={handleProfileMenuOpen}
      >
        {photoURL ?
          <img
            className={classes.avatar}
            alt={displayName}
            src={photoURL}
          /> : <AccountCircle />
        }
      </IconButton>
      {renderMenu}
    </>
  )
}

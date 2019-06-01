import {IconButton, Menu, MenuItem} from "@material-ui/core"
import React, {ReactElement} from "react"
import {AccountCircle} from "@material-ui/icons"
import {useTranslation} from "react-i18next"

export const ProfileMenu: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = (event): void => {
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
        onClick={handleMenuClose}
      >
        {t('account')}
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
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </>
  )
}

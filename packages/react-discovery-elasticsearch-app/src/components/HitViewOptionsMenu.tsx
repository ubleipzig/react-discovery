import {IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@material-ui/core"
import {MoreVert, PlaylistAdd} from "@material-ui/icons"
import React, {ReactElement} from "react"
import {setViewIdMap} from '@react-discovery/workspace'
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

export const HitViewOptionsMenu: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleHitViewOptionsMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddToWorkspace = ({}): void => {
    dispatch(setViewIdMap({id, type: 'data'}))
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const options = [
    {
      key: 'addToWorkspace',
      label: 'addToWorkspace'
    },
  ]

  const buildMenuItems = (): ReactElement[] => {
    return options && options.map((option, i): ReactElement =>
      <MenuItem
        button={true}
        component='div'
        data-testid={`hitViewOptions-menu-item-${i}`}
        key={i}
        onClick={(): void => handleAddToWorkspace(option.key)}
      >
        <ListItemIcon>
          <PlaylistAdd/>
        </ListItemIcon>
        <Typography>{t(option.label)}</Typography>
      </MenuItem>)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
    >
      {buildMenuItems()}
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
        onClick={handleHitViewOptionsMenuOpen}
      >
        <MoreVert />
      </IconButton>
      {renderMenu}
    </>
  )
}

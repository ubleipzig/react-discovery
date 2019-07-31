import {IconButton, Menu, MenuItem, Tooltip, Typography, withStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getIsInWorkspace, setViewIdMap} from '@react-discovery/workspace'
import {MoreVert} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const ColorButton = withStyles(() => ({
  root: {
    "&:hover": {
      opacity: 1
    },
    color: 'white',
    opacity: 0
  },
}))(IconButton)

export const HitViewOptionsMenu: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()
  const isInWorkspace = getIsInWorkspace(id)
  const handleHitViewOptionsMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddToWorkspace = (key): void => {
    switch (key) {
      case 'addMediaToWorkspace':
        dispatch(setViewIdMap({id, type: 'image'}))
        break
      case 'addDataToWorkspace':
        dispatch(setViewIdMap({id, type: 'data'}))
    }
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const options = [
    {
      key: 'addMediaToWorkspace',
      label: 'addMediaToWorkspace'
    },
    {
      key: 'addDataToWorkspace',
      label: 'addDataToWorkspace'
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
        <Typography>{t(option.label)}</Typography>
      </MenuItem>)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      open={isMenuOpen}
    >
      {buildMenuItems()}
    </Menu>
  )

  return (
    <div style={{position: 'absolute'}}>
      <Tooltip
        title={t('moreOptions')}>
        <ColorButton
          aria-haspopup="true"
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          color={isInWorkspace ? 'secondary' : 'primary'}
          onClick={handleHitViewOptionsMenuOpen}
        >
          <MoreVert />
        </ColorButton>
      </Tooltip>
      {renderMenu}
    </div>
  )
}

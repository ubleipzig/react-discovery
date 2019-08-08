import {Badge, IconButton, Menu, MenuItem, Theme, Tooltip, Typography, withStyles} from "@material-ui/core"
import {MoreVert, MoreVertOutlined} from "@material-ui/icons"
import React, {ReactElement} from "react"
import {getNumberOfWorkspaceNodesForId, setViewIdMap} from '@react-discovery/workspace'
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

interface IHitViewOptionsMenu {
  id: string;
}

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge)

export const HitViewOptionsMenu: React.FC<IHitViewOptionsMenu> = (props): ReactElement => {
  const {id} = props
  const nodeCount = getNumberOfWorkspaceNodesForId(id)
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleHitViewOptionsMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddToWorkspace = (key): void => {
    switch (key) {
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

  const buildStyledBadge = () => {
    return (
      <StyledBadge
        badgeContent={nodeCount}
        color="secondary"
      > <IconButton
          href=''
          onClick={handleHitViewOptionsMenuOpen}>
          {
            nodeCount > 0 ? <MoreVert fontSize='default' style={{padding: '5px'}}/>
              : <MoreVertOutlined fontSize='default' style={{padding: '5px'}}/>
          }
        </IconButton>
      </StyledBadge>
    )
  }

  return (
    <div>
      <Tooltip
        title={t('moreOptions')}>
        {buildStyledBadge()}
      </Tooltip>
      {renderMenu}
    </div>
  )
}

import {IconButton, Menu, MenuItem, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getTypeDef, setTypeDef} from "@react-discovery/solr"
import Settings from "@material-ui/icons/Settings"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const SearchSettingsMenu: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const typeDef = getTypeDef()
  const parsers = [
    {
      key: 'edismax',
      label: 'simple'
    },
    {
      key: 'lucene',
      label: 'expert'
    }
  ]
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuAction = (typeDef): void => {
    dispatch(setTypeDef({typeDef}))
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const buildMenuItems = (): ReactElement[] => {
    return parsers && parsers.map((parser, i): ReactElement =>
      <MenuItem
        button={true}
        component='div'
        data-testid={`search-settings-menu-item-${i}`}
        divider
        key={i}
        onClick={(): void => handleMenuAction(parser.key)}
        selected={typeDef === parser.key}
      >{t(parser.label)}
      </MenuItem>)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'center',
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
        className={classes.menuButton}
        color="inherit"
        data-testid='search-settings-menu'
        edge="end"
        href=''
        onClick={handleMenuOpen}
      >
        <Settings/>
      </IconButton>
      {renderMenu}
    </>
  )
}

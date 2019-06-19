import {IconButton, Menu, MenuItem} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getCurrentLanguage, getLanguages, setCurrentLanguage} from "@react-discovery/solr"
import {IOverridableStyledComponent} from "../.."
import Language from "@material-ui/icons/Language"
import {useDispatch} from "react-redux"
import {useMenuButtonStyles} from "../../styles"

export const LanguageSelectionMenu: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useMenuButtonStyles({})
  const currentLanguage = getCurrentLanguage()
  const dispatch = useDispatch()
  const languages = getLanguages()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuAction = (locale): void => {
    dispatch(setCurrentLanguage({currentLanguage: locale}))
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const buildMenuItems = (): ReactElement[] => {
    return languages && languages.map((language, i): ReactElement =>
      <MenuItem
        button={true}
        component='div'
        data-testid={`language-settings-menu-item-${i}`}
        divider
        key={i}
        onClick={(): void => handleMenuAction(language.locale)}
        selected={currentLanguage === language.locale}
      >{language.label}
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
        data-testid='language-settings-menu'
        edge="end"
        href=''
        onClick={handleMenuOpen}
      >
        <Language/>
      </IconButton>
      {renderMenu}
    </>
  )
}

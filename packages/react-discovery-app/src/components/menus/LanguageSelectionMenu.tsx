import React, {ReactElement} from "react"
import {getLanguages, setCurrentLanguage} from "@react-discovery/solr"
import IconButton from "@material-ui/core/IconButton"
import Language from "@material-ui/icons/Language"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles} from "@material-ui/core"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const LanguageSelectionMenu: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
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
        divider
        key={i}
        onClick={(): void => handleMenuAction(language.locale)}
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

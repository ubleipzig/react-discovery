import {Button, Tooltip, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {UnfoldLess, UnfoldMore} from '@material-ui/icons'
import {getIsViewExpanded, setIsViewExpanded} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const isViewExpanded = getIsViewExpanded()

  const handleChange = (isViewExpanded): void => {
    dispatch(setIsViewExpanded({isViewExpanded}))
  }

  return (
    <Tooltip title={isViewExpanded ? t('unfoldLess') : t('unfoldMore')}>
      <Button
        aria-label="delete"
        className={classes.button}
        onClick={(): void => handleChange(!isViewExpanded)}
        variant="contained"
      >
        {isViewExpanded ? <UnfoldLess/> : <UnfoldMore/>}
      </Button>
    </Tooltip>
  )
}


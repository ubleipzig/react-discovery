import {FormControl, FormControlLabel, Switch} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getIsViewExpanded, setIsViewExpanded} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import {useViewSwitcherStyles} from "../styles"

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation()
  const classes: any = useViewSwitcherStyles({})
  const dispatch = useDispatch()
  const isViewExpanded = getIsViewExpanded()

  const handleChange = (isViewExpanded): void => {
    dispatch(setIsViewExpanded({isViewExpanded}))
  }

  return (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <FormControlLabel
        control={
          <Switch
            checked={isViewExpanded}
            color="primary"
            data-testid='view-switcher-toggle'
            onChange={(): void => handleChange(!isViewExpanded)}
            value="checkedB"
          />
        }
        label={t('expandView')}
      />
    </FormControl>
  )
}


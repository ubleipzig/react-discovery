import {FormControl, FormControlLabel, Switch} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getIsItemExpanded, setIsItemExpanded} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import {useViewSwitcherStyles} from "../styles"

export const ExpandItemToggle: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const {t} = useTranslation()
  const classes: any = useViewSwitcherStyles({})
  const dispatch = useDispatch()
  const isItemExpanded = getIsItemExpanded(id) || false

  const handleChange = (isItemExpanded): void => {
    dispatch(setIsItemExpanded({id, isItemExpanded}))
  }

  return (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <FormControlLabel
        control={
          <Switch
            checked={isItemExpanded}
            color="primary"
            data-testid='view-switcher-toggle'
            onChange={(): void => handleChange(!isItemExpanded)}
            value="checkedB"
          />
        }
        label={t('showInner')}
      />
    </FormControl>
  )
}


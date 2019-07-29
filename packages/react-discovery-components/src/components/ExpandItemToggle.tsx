import {FormControl, FormControlLabel, Switch} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getItemViewType, setItemViewType} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import {useViewSwitcherStyles} from "../styles"

export const ExpandItemToggle: React.FC<any> = (props): ReactElement => {
  const {id} = props
  const {t} = useTranslation()
  const classes: any = useViewSwitcherStyles({})
  const dispatch = useDispatch()
  const itemViewType = getItemViewType(id) || 'info'

  const handleChange = (): void => {
    if (itemViewType === 'expanded') {
      dispatch(setItemViewType({id, itemViewType: 'info'}))
    } else {
      dispatch(setItemViewType({id, itemViewType: 'expanded'}))
    }
  }

  return (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <FormControlLabel
        control={
          <Switch
            checked={itemViewType === 'expanded'}
            color="primary"
            data-testid='view-switcher-toggle'
            onChange={(): void => handleChange()}
            value="checkedB"
          />
        }
        label={t('showInner')}
      />
    </FormControl>
  )
}


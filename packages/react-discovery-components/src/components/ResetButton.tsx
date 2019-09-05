import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {IOverridableStyledComponent} from ".."
import {IconButton, Tooltip} from "@material-ui/core"
import {Loop} from "@material-ui/icons"
import {getCurrentSearchContext} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useNavigation} from 'react-navi'
import {useResetButtonStyles} from "../styles"
import {useTranslation} from "react-i18next"

export const ResetButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useResetButtonStyles({})
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const currentSearchContext = getCurrentSearchContext()
  const handleChange = (): void => {
    dispatch(ESCore.state.setQueryInput({stringInput: ''}))
    dispatch(ESCore.state.setFrom({from: 0}))
    navigation.navigate(currentSearchContext)
  }
  const {t} = useTranslation('common')

  return (
    <Tooltip
      title={t('resetSearch')}>
      <IconButton
        className={classes.menuButton}
        color="inherit"
        data-testid='reset'
        href=''
        onClick={handleChange}
      >
        <Loop/>
      </IconButton>
    </Tooltip>
  )
}

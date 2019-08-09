import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {IOverridableStyledComponent} from ".."
import {IconButton} from "@material-ui/core"
import {Loop} from "@material-ui/icons"
import {getCurrentSearchContext} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useNavigation} from 'react-navi'
import {useResetButtonStyles} from "../styles"

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

  return (
    <IconButton
      className={classes.menuButton}
      color="inherit"
      data-testid='reset'
      href=''
      onClick={handleChange}
    >
      <Loop/>
    </IconButton>
  )
}

import {ESCore, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {IOverridableStyledComponent} from ".."
import {IconButton} from "@material-ui/core"
import {Loop} from "@material-ui/icons"
import {getRootContext} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useNavigation} from 'react-navi'
import {useResetButtonStyles} from "../styles"

export const ResetButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useResetButtonStyles({})
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const rootContext = getRootContext()
  const handleChange = (): void => {
    dispatch(SolrCore.state.setQueryInput({stringInput: ''}))
    dispatch(SolrCore.state.setStart({start: 0}))
    dispatch(ESCore.state.setFrom({from: 0}))
    dispatch(SolrCore.state.setTypeDef({typeDef: SolrCore.enums.SolrParameters.EDISMAX}))
    navigation.navigate(rootContext)
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

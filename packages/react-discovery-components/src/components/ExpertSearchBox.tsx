import {EndAdornment, StartAdornment} from "./SearchBoxInputAdornments"
import React, {ReactElement} from "react"
import {useCurrentRoute, useNavigation} from "react-navi"
import {IOverridableStyledComponent} from ".."
import {SolrCore} from "@react-discovery/core"
import {TextField} from '@material-ui/core'
import {useDispatch} from "react-redux"
import {useSearchBoxStyles} from "../styles"
import {useTranslation} from "react-i18next"

export const ExpertSearchBox: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const {t} = useTranslation()
  const classes: any = props.classes || useSearchBoxStyles({})
  const dispatch = useDispatch()
  const [values, setValues] = React.useState("")
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const pathname = route.url.pathname

  const handleClear = (): void => {
    setValues('')
    dispatch(SolrCore.state.setQueryInput({stringInput: null}))
  }

  const handleChange = (e): void => {
    setValues(e.target.value)
  }

  const handleSubmit = ((e): void => {
    e.preventDefault()
    if (pathname !== '/') {
      navigation.navigate('/')
    }
    dispatch(SolrCore.state.setQueryInput({stringInput: values}))
    dispatch(SolrCore.state.setStart({start: 0}))
  })

  return (
    <form
      autoComplete="off"
      className={classes.container}
      data-testid='expert-searchform'
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={
          values ? {
            endAdornment: <EndAdornment onClick={handleClear}/>,
            startAdornment: <StartAdornment/>,
          } : {
            startAdornment: <StartAdornment/>,
          }
        }
        className={classes.input}
        fullWidth
        id="expert-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder={t('expertSearch')}
        type="search"
        value={values}
      />
    </form>
  )
}

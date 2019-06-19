import {EndAdornment, StartAdornment} from "./SearchBoxInputAdornments"
import React, {ReactElement} from "react"
import {setQueryInput, setSelectedIndex, setStart, setSuggest} from "@react-discovery/solr"
import {useCurrentRoute, useNavigation} from "react-navi"
import {TextField} from '@material-ui/core'
import {useDispatch} from "react-redux"
import {useSearchBoxStyles} from "../styles"
import {useTranslation} from "react-i18next"

export const SearchBox: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation()
  const classes: any = useSearchBoxStyles({})
  const dispatch = useDispatch()
  const [values, setValues] = React.useState("")
  const navigation = useNavigation()
  const route = useCurrentRoute()
  const pathname = route.url.pathname

  const handleChange = (e): void => {
    setValues(e.target.value)
  }

  const handleClear = (): void => {
    setValues('')
    dispatch(setQueryInput({stringInput: null}))
  }

  const handleSubmit = ((e): void => {
    e.preventDefault()
    if (pathname !== '/') {
      navigation.navigate('/')
    }
    dispatch(setQueryInput({stringInput: values}))
    dispatch(setSelectedIndex({selectedIndex: 0}))
    dispatch(setStart({start: 0}))
    dispatch(setSuggest({stringInput: values, suggest: false}))
  })

  return (
    <form
      autoComplete="off"
      className={classes.container}
      data-testid='standard-searchform'
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
        id="standard-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder={t('search')}
        type="search"
        value={values}
      />
    </form>
  )
}

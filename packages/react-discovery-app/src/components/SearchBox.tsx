import {EndAdornment, StartAdornment} from "./SearchBoxInputAdornments"
import React, {ReactElement} from "react"
import {setQueryInput, setStart} from "@react-discovery/solr"
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme): any => ({
  container: {
    display: 'flex',
    flex: '1',
    marginLeft: 0,
    marginRight: theme.spacing(2),
    maxHeight: '48px',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export const SearchBox: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation()
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const [values, setValues] = React.useState("")

  const handleChange = (e): void => {
    const stringInput = e.target.value;
    dispatch(setQueryInput({stringInput}))
    dispatch(setStart({newStart: 0}))
    setValues(e.target.value)
  }

  const handleClear = (): void => {
    setValues('')
    dispatch(setQueryInput({stringInput: null}))
  }

  const handleSubmit = ((e): void => {
    e.preventDefault()
  })

  return (
    <form
      autoComplete="off"
      className={classes.container}
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
        fullWidth
        id="standard-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder={t('search')}
        style={{ backgroundColor: 'white', margin: 8 }}
        type="search"
        value={values}
      />
    </form>
  )
}

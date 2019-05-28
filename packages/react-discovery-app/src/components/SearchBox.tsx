import React, {ReactElement} from "react"
import {setDisMaxQuery, setStart} from "@react-discovery/solr"
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from "react-redux"

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
  const classes: any = useStyles()
  const dispatch = useDispatch()
  const [values, setValues] = React.useState("")

  const handleChange = (e): void => {
    const stringInput = e.target.value;
    dispatch(setDisMaxQuery({stringInput, typeDef: "dismax"}))
    dispatch(setStart({newStart: 0}))
    setValues(e.target.value)
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        fullWidth
        id="standard-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder="Search…"
        style={{ backgroundColor: 'white', margin: 8 }}
        type="search"
        value={values}
      />
    </form>
  )
}

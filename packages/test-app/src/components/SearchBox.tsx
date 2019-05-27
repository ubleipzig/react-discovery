import React, {ReactElement} from "react"
import {setDisMaxQuery, setStart} from "solr-react-faceted-search"
import {connect} from "react-redux"
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

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

interface ISearchBox {
  setDisMaxQuery: typeof setDisMaxQuery;
  setStart: typeof setStart;
}

const SearchBoxComponent: React.FC<any> = (props: ISearchBox): ReactElement => {
  const {setDisMaxQuery, setStart} = props
  const classes: any = useStyles()
  const [values, setValues] = React.useState("")

  const handleChange = (e): void => {
    const stringInput = e.target.value;
    setDisMaxQuery({stringInput, typeDef: "dismax"})
    setStart({newStart: 0})
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

const mapDispatchToProps = {setDisMaxQuery, setStart}

export const SearchBox = connect(null, mapDispatchToProps)(SearchBoxComponent)

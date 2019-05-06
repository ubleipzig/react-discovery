import React, {ReactElement} from "react"
import {setDisMaxQuery, setStart} from "solr-react-faceted-search"
import {connect} from "react-redux"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

interface ISearchBox {
  setDisMaxQuery: typeof setDisMaxQuery
  setStart: typeof setStart
}

const SearchBoxComponent: React.FC<any> = (props: ISearchBox): ReactElement => {
  const {setDisMaxQuery, setStart} = props
  const classes = useStyles()
  const [values, setValues] = React.useState("")

  const handleChange = (e) => {
    const stringInput = e.target.value;
    setDisMaxQuery({typeDef: "dismax", stringInput})
    setStart({newStart: 0})
    setValues(e.target.value)
  }

  const handleSubmit = (e => {
    e.preventDefault()
  })

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          fullWidth
          id="standard-full-width"
          label="Search field"
          type="search"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          onChange={handleChange}
          style={{ margin: 8 }}
          variant="outlined"
          value={values}
        />
      </form>
    </div>
  )
}

const mapStateToProps = (state): any => ({
  query: state.query,
  results: state.response
})

const mapDispatchToProps = {setDisMaxQuery, setStart}

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBoxComponent)

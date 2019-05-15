import React, {ReactElement} from "react"
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import NativeSelect from '@material-ui/core/NativeSelect'
import {connect} from "react-redux"
import {setSortFields} from "solr-react-faceted-search"
import { makeStyles } from '@material-ui/core/styles'
import {ISortField} from "../config"

interface ISortingSelector {
  setSortFields: Function;
  sortFields: ISortField[];
  selectedSortField: ISortField;
}

const useStyles = makeStyles((theme): any => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SortingSelectorComponent: React.FC<any> = (props: ISortingSelector): ReactElement => {
  const classes: any = useStyles();
  const [selectorValue, setSelectorValue] = React.useState('')
  const {sortFields, setSortFields} = props

  const handleChange = (e): void => {
    const newSortFields = sortFields.reduce((acc, currVal): any => {
      let val
      if (currVal.field === e.target.value) {
        val = {
          ...currVal,
          isSelected: true
        }
      } else {
        val = {
          ...currVal,
          isSelected: false
        }
      }
      return [...acc, val]
    }, [])
    const sorted = newSortFields.sort((a: any, b: any): any => (a.isSelected === b.isSelected) ? 0 : a.isSelected ? -1 : 1)
    setSortFields({sortFields: sorted})
    setSelectorValue(sorted[0].field)
  }

  const buildOptions = (): ReactElement[] => {
    return sortFields.map((sf, i): ReactElement => <option key={i} value={sf.field}>{sf.label}</option>)
  }

  return sortFields ? (
    <FormControl className={classes.formControl}>
      <NativeSelect
        value={selectorValue}
        onChange={handleChange}
        input={<Input name="sort" id="sort-native-simple" />}
      >
        {buildOptions()}
      </NativeSelect>
    </FormControl>
  ) : null
}

const mapStateToProps = (state): any => ({
  sortFields: state.query.sortFields,
})

const mapDispatchToProps = {setSortFields}

export const SortingSelector = connect(mapStateToProps, mapDispatchToProps)(SortingSelectorComponent)

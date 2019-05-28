import {ISortField, setSortFields, setSuggest} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect'
import {connect} from "react-redux"
import { makeStyles } from '@material-ui/core/styles'

interface ISortingSelector {
  setSortFields: Function;
  setSuggest: Function;
  sortFields: ISortField[];
  selectedSortField: ISortField;
}

const useStyles = makeStyles((theme): any => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SortingSelectorComponent: React.FC<any> = (props: ISortingSelector): ReactElement => {
  const classes: any = useStyles();
  const [selectorValue, setSelectorValue] = React.useState('')
  const [sortOrder, setSortOrder] = React.useState('asc')
  const {sortFields, setSortFields, setSuggest} = props

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
    const [currentSortSelection] = sorted
    setSuggest({suggest: false})
    setSortFields({sortFields: sorted})
    setSelectorValue(currentSortSelection.field)
    setSortOrder(currentSortSelection.order)
  }

  const handleSortOrder = (value): void => {
    if (value !== sortOrder) {
      setSortOrder(value)
      const order = {
        order: value
      }
      const [currentSortField] = sortFields
      const newSortField = {...currentSortField, ...order}
      const newSortFields = sortFields.map((sf, i): ISortField => {
        if (i === 0) {
          return newSortField
        }
        return sf
      })
      setSortFields({sortFields: newSortFields})
    }
  }

  const buildOptions = (): ReactElement[] => {
    return sortFields.map((sf, i): ReactElement => <option key={i} value={sf.field}>{sf.label}</option>)
  }

  const buildSortOrderButton = (): ReactElement => {
    if (sortOrder === 'asc') {
      return (
        <IconButton
          aria-label="Sort Descending"
          className={classes.button}
          href=''
          onClick={(): void => handleSortOrder('desc')}>
          <ArrowUpward/>
        </IconButton>)
    } else {
      return (
        <IconButton
          aria-label="Sort Ascending"
          className={classes.button}
          href=''
          onClick={(): void => handleSortOrder('asc')}
        >
          <ArrowDownward/>
        </IconButton>)
    }
  }

  return sortFields ? (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <div style={{display: 'flex'}}>
        {buildSortOrderButton()}
        <InputLabel shrink style={{textAlign: 'right', width: '100%'}}>Set Sort Order</InputLabel>
        <NativeSelect
          input={<Input id="sort-native-simple" name="sort" />}
          onChange={handleChange}
          value={selectorValue}
        >
          {buildOptions()}
        </NativeSelect>
      </div>
    </FormControl>
  ) : null
}

const mapStateToProps = (state): any => ({
  sortFields: state.query.sortFields,
})

const mapDispatchToProps = {setSortFields, setSuggest}

export const SortingSelector = connect(mapStateToProps, mapDispatchToProps)(SortingSelectorComponent)

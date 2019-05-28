import React, {ReactElement} from 'react'
import {setStart, setSuggest} from "@react-discovery/solr"
import Chip from '@material-ui/core/Chip'
import Downshift from 'downshift'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {connect} from "react-redux"
import deburr from 'lodash/deburr'
import { makeStyles } from '@material-ui/core/styles'

interface ISuggestion {
  highlightedIndex: number;
  index: number;
  itemProps: {};
  selectedItem: string;
  suggestion: string;
}

const renderSuggestion = (props: ISuggestion): ReactElement => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = props
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1

  return (
    <MenuItem
      {...itemProps}
      component="div"
      key={suggestion}
      selected={isHighlighted}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  )
}

const useStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  container: {
    flexGrow: 1,
    height: '105px',
    padding: '8px',
    position: 'relative',
  },
  divider: {
    height: theme.spacing(2),
  },
  inputInput: {
    flexGrow: 1,
    width: 'auto',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  label: {
    whiteSpace: 'initial'
  },
  paper: {
    left: 0,
    marginTop: theme.spacing(1),
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  root: {
    flexGrow: 1,
  },
}))

const renderInput = (inputProps): ReactElement => {
  const { InputProps, classes, ref, ...other } = inputProps
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        classes: {
          input: classes.inputInput,
          root: classes.inputRoot,
        },
        ...InputProps,
        inputRef: ref,
      }}
      style={{ width: '100%' }}
      variant="outlined"
      {...other}
    />
  )
}

interface ISuggester {
  setStart: Function;
  setSuggest: Function;
  terms: string[];
}

export const SuggesterComponent: React.FC<any> = (props: ISuggester): ReactElement => {
  const {setStart, setSuggest, terms} = props
  const classes: any = useStyles()
  const [selectedItem, setSelectedItem] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')

  const onInputChange = (e): void => {
    setInputValue(e.target.value)
    setSuggest({stringInput: e.target.value, suggest: true})
  }

  const onSelect = (item): void => {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
    const quotedItem = `"${item}"`
    setSuggest({stringInput: quotedItem, suggest: true})
    setStart({newStart: 0})
  }

  const handleDelete = (item): any => (): void => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
    setSuggest({stringInput: '', suggest: true})
    setStart({newStart: 0})
  }

  const handleKeyDown = (event): void => {
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }

  const getSuggestions = (value, { showEmpty = false } = {}): string[] => {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0
    const suggestions = terms && terms.filter((t): boolean => {
      const keep = count < 5 && t.slice(0, inputLength).toLowerCase() === inputValue
      if (keep) {
        count += 1
      }
      return keep
    })
    return inputLength === 0 && !showEmpty
      ? []
      : suggestions
  }

  return (
    <div className={classes.root}>
      <Downshift
        id="downshift-simple"
        inputValue={inputValue}
        onChange={onSelect}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
        }): ReactElement => (
          <div className={classes.container}>
            {renderInput({
              classes,
              InputProps: getInputProps({
                onChange: onInputChange,
                onKeyDown: handleKeyDown,
                placeholder: 'Search name',
                startAdornment: selectedItem.map((item): ReactElement => (
                  <Chip
                    classes={{
                      label: classes.label,
                      root: classes.chip
                    }}
                    component='div'
                    key={item}
                    label={item}
                    onDelete={handleDelete(item)}
                    tabIndex={-1}
                  />
                )),
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper
                  className={classes.paper}
                  square
                >
                  {terms && getSuggestions(inputValue2).map((suggestion, index): ReactElement =>
                    renderSuggestion({
                      highlightedIndex,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      selectedItem: selectedItem2,
                      suggestion,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  )
}

const mapStateToProps = (state): any => ({
  terms: state.suggestions && state.suggestions.terms,
})

const mapDispatchToProps = {setStart, setSuggest}

export const Suggester = connect(mapStateToProps, mapDispatchToProps)(SuggesterComponent)

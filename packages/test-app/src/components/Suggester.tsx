import React, {ReactElement} from 'react';
import deburr from 'lodash/deburr';
import Chip from '@material-ui/core/Chip'
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {setStart, setSuggest} from "solr-react-faceted-search"
import {connect} from "react-redux"

interface ISuggestion {
  highlightedIndex: number;
  index: number;
  itemProps: {};
  selectedItem: string;
  suggestion: string;
}

const renderSuggestion = (props: ISuggestion): ReactElement => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = props
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
}

const useStyles = makeStyles((theme): any => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    height: '105px',
    padding: '8px',
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

const renderInput = (inputProps): ReactElement => {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      style={{ width: '100%' }}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

interface ISuggester {
  setStart: Function;
  setSuggest: Function;
  terms: string[];
}

export const SuggesterComponent: React.FC<any> = (props: ISuggester): ReactElement => {
  const {setStart, setSuggest, terms} = props
  const classes: any = useStyles();
  const [selectedItem, setSelectedItem] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')

  const onInputChange = (e): void => {
    setInputValue(e.target.value)
    setSuggest({suggest: true, stringInput: e.target.value})
  }

  const onSelect = (item): void => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('')
    setSelectedItem(newSelectedItem);
    const quotedItem = `"${item}"`
    setSuggest({suggest: true, stringInput: quotedItem})
    setStart({newStart: 0})
  }

  const handleDelete = (item): any => (): void => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    setSuggest({suggest: true, stringInput: ''})
    setStart({newStart: 0})
  }

  const handleKeyDown = (event): void => {
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  const getSuggestions = (value, { showEmpty = false } = {}): string[] => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestions = terms && terms.filter((t): boolean => {
      const keep = count < 5 && t.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }
      return keep;
    })
    return inputLength === 0 && !showEmpty
      ? []
      : suggestions;
  }

  return (
    <div className={classes.root}>
      <Downshift
        id="downshift-simple"
        inputValue={inputValue}
        onChange={onSelect}
      >
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
                startAdornment: selectedItem.map((item): ReactElement => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onChange: onInputChange,
                onKeyDown: handleKeyDown,
                placeholder: 'Search name'
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {terms && getSuggestions(inputValue2).map((suggestion, index): ReactElement =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
}

const mapStateToProps = (state): any => ({
  terms: state.suggestions && state.suggestions.terms,
})

const mapDispatchToProps = {setStart, setSuggest}

export const Suggester = connect(mapStateToProps, mapDispatchToProps)(SuggesterComponent)

import React, {ReactElement, useEffect} from "react";
import {getNumFound, getSelectedIndex, getSize, getStart, getStringInput,
  setSelectedIndex, setStart, setSuggest} from "@react-discovery/solr"
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SkipNext from '@material-ui/icons/SkipNext'
import SkipPrevious from '@material-ui/icons/SkipPrevious'
import {makeStyles} from "@material-ui/core"
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme): any => ({
  button: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    padding: '5px 16px',
  },
}));

export const Pagination: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const start = getStart()
  const size = getSize()
  const selectedIndex = getSelectedIndex()
  const stringInput = getStringInput()
  const numFound = getNumFound()

  useEffect((): void => {
    if (start === 0) {
      dispatch(setSelectedIndex({selectedIndex: 0}))
    }
  })

  const currentPage = start / size;
  const pageAmt = Math.ceil(numFound / size);
  let rangeStart = currentPage - 2 < 0 ? 0 : currentPage - 2
  let rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5

  const buildRangeStart = (): void => {
    if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
      rangeStart = rangeEnd - 5;
      if (rangeStart < 0) {
        rangeStart = 0;
      }
    }
  }

  const buildPages = (rangeStart, rangeEnd): number[] => {
    const pages = []
    for (let page = rangeStart; page < rangeEnd; page++) {
      if (pages.indexOf(page) < 0) {
        pages.push(page);
      }
    }
    return pages
  }

  buildRangeStart()
  const pages = buildPages(rangeStart, rangeEnd)


  const onPageChange = (page): void => {
    if (page >= pageAmt || page < 0) {
      return;
    }
    dispatch(setStart({newStart: page * size}))
    dispatch(setSuggest({stringInput, suggest: false}))
    dispatch(setSelectedIndex({selectedIndex: page}))
  }

  const buildIcon = (key): ReactElement => {
    switch (key) {
      case 'first':
        return <SkipPrevious/>
      case 'previous':
        return <ChevronLeft/>
      case 'next':
        return <ChevronRight/>
      case 'last':
        return <SkipNext/>
    }
  }

  const PageControlIndexButton = (page, label, key): ReactElement =>
    <ListItem
      button
      className={classes.button}
      component='div'
      dense
      key={key}
      onClick={(): void => onPageChange(page)}
      selected={selectedIndex === page}
    >
      <ListItemText primary={label}/>
    </ListItem>

  const PageControlButton = (page, key): ReactElement =>
    <ListItem
      button
      className={classes.button}
      component='div'
      dense
      key={key}
      onClick={(): void => onPageChange(page)}
      selected={selectedIndex === page}
    >
      {buildIcon(key)}
    </ListItem>

  const renderPages = (pages): ReactElement => {
    return pages && pages.map((page, i): ReactElement =>
      PageControlIndexButton(page, page + 1, i)
    )
  }

  return (
    <div style={{maxWidth: 360, width: '100%'}}>
      <List component="nav" style={{display: 'flex'}}>
        {PageControlButton(0, "first")}
        {PageControlButton(currentPage - 1, "previous")}
        {renderPages(pages)}
        {PageControlButton(currentPage + 1, "next")}
        {PageControlButton(pageAmt - 1, "last")}
      </List>
    </div>
  )
}

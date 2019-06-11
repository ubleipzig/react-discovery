import {ChevronLeft, ChevronRight, SkipNext, SkipPrevious} from '@material-ui/icons'
import {List, ListItem, ListItemText, makeStyles} from '@material-ui/core'
import React, {ReactElement, useEffect} from "react"
import {
  getNumFound, getSelectedIndex, getSize, getStart, getStringInput,
  setSelectedIndex, setStart, setSuggest, usePrevious
} from "@react-discovery/solr"
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
  const prevSelectedIndex = usePrevious(selectedIndex)
  const stringInput = getStringInput()
  const numFound = getNumFound()
  const currentPage = start / size;
  const pageAmt = Math.ceil(numFound / size)

  useEffect((): void => {
    if (start === null && prevSelectedIndex === undefined) {
      if (selectedIndex !== 0) {
        dispatch(setSelectedIndex({selectedIndex: 0}))
      }
    }
  })

  let rangeStart = Math.max(0, currentPage - 2)
  const rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5

  const buildRangeStart = (): void => {
    if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
      rangeStart = rangeEnd - 5;
    }
  }

  const range = (start, stop, step): number[] =>
    Array.from({length: (stop - start) / step + 1}, (_, i): number => start + (i * step))

  const buildPages = (rangeStart, rangeEnd): number[] => {
    return range(rangeStart, rangeEnd, 1)
  }

  buildRangeStart()
  const pages = buildPages(rangeStart, rangeEnd - 1)

  const onPageChange = (page): void => {
    if (page >= pageAmt || page < 0) {
      return;
    }
    dispatch(setStart({start: page * size}))
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
      data-testid={`page-index-${key}`}
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
      data-testid={`page-control-${key}`}
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

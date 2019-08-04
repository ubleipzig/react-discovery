import {ChevronLeft, ChevronRight, SkipNext, SkipPrevious} from '@material-ui/icons'
import {ESCore, usePrevious} from "@react-discovery/core"
import {List, ListItem, ListItemText} from '@material-ui/core'
import React, {ReactElement, useEffect} from "react"
import {getSelectedIndex, setSelectedIndex} from '@react-discovery/configuration'
import {IOverridableStyledComponent} from "../../index"
import {useDispatch} from 'react-redux'
import {usePaginationStyles} from "../../styles"

export const Pagination: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || usePaginationStyles({})
  const dispatch = useDispatch()
  const from = ESCore.state.getFrom()
  const size = ESCore.state.getSize()
  const selectedIndex = getSelectedIndex()
  const prevSelectedIndex = usePrevious(selectedIndex)
  const numFound = ESCore.state.getNumFound()
  const currentPage = from / size;
  const pageAmt = Math.ceil(numFound / size)

  useEffect((): void => {
    if (from === null && prevSelectedIndex === undefined) {
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
    dispatch(ESCore.state.setFrom({from: page * size}))
    dispatch(setSelectedIndex({selectedIndex: page}))
    window.scrollTo(0, 0)
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
    <div className={classes.listWrapper}>
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

import React, {ReactElement, useEffect} from "react";
import {connect} from 'react-redux'
import {setSelectedIndex, setStart} from "solr-react-faceted-search"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IPagination {
  response: any;
  selectedIndex: number;
  setSelectedIndex: Function;
  setStart: Function;
  size: number;
  start: number;
}

export const PaginationComponent: React.FC<any> = (props: IPagination): ReactElement => {
  const {start, size, response, selectedIndex, setSelectedIndex, setStart} = props;
  const {numFound} = Object.keys(response).length && response.hits !== null && response.hits

  useEffect((): void => {
    if (start === 0) {
      setSelectedIndex({selectedIndex: 0})
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
    setStart({newStart: page * size})
    setSelectedIndex({selectedIndex: page});
  }

  const PageControlButton = (page, label, key): ReactElement =>
    <ListItem
      button
      component='div'
      dense
      key={key}
      selected={selectedIndex === page}
      onClick={(): void => onPageChange(page)}
    >
      <ListItemText primary={label}/>
    </ListItem>

  const renderPages = (pages): ReactElement => {
    return pages && pages.map((page, i): ReactElement =>
      PageControlButton(page, page + 1, i)
    )
  }


  return (
    <div style={{width: '100%', maxWidth: 360}}>
      <List style={{display: 'flex'}} component="nav">
        {PageControlButton(0, "<<", "first")}
        {PageControlButton(currentPage - 1, "<", "previous")}
        {renderPages(pages)}
        {PageControlButton(currentPage + 1, ">", "next")}
        {PageControlButton(pageAmt - 1, ">>", "last")}
      </List>
    </div>
  );
}

const mapStateToProps = (state): any => ({
  selectedIndex: state.config.selectedIndex,
  size: state.query.size,
  start: state.query.start,
  response: state.response
})

const mapDispatchToProps = {setSelectedIndex, setStart}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

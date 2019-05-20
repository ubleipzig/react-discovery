import React, {ReactElement, useEffect} from "react";
import {connect} from 'react-redux'
import {setSelectedIndex, setStart, setSuggest} from "solr-react-faceted-search"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import {makeStyles} from "@material-ui/core"

interface IPagination {
  response: any;
  selectedIndex: number;
  setSelectedIndex: Function;
  setStart: Function;
  setSuggest: Function;
  size: number;
  start: number;
}

const useStyles = makeStyles((theme): any => ({
  button: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    padding: '5px 16px',
  },
}));

export const PaginationComponent: React.FC<any> = (props: IPagination): ReactElement => {
  const {start, size, response, selectedIndex, setSelectedIndex, setStart, setSuggest} = props;
  const {numFound} = Object.keys(response).length && response.hits !== null && response.hits
  const classes: any = useStyles()

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
    setSuggest({suggest: false})
    setSelectedIndex({selectedIndex: page});
  }

  const buildIcon = (key): ReactElement => {
    switch (key) {
      case 'first':
        return <ChevronLeft/>
      case 'previous':
        return <ChevronLeft/>
      case 'next':
        return <ChevronRight/>
      case 'last':
        return <ChevronRight/>
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
  );
}

const mapStateToProps = (state): any => ({
  response: state.response,
  selectedIndex: state.config.selectedIndex,
  size: state.query.size,
  start: state.query.start,
})

const mapDispatchToProps = {setSelectedIndex, setStart, setSuggest}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

import React, {ReactElement} from "react";
import {connect} from 'react-redux'
import {setStart} from "solr-react-faceted-search"
import Button from '@material-ui/core/Button'

export const PaginationComponent: React.FC<any> = (props): ReactElement => {
  const {query, response, setStart} = props;
  const {start, rows} = query;
  const {numFound} = Object.keys(response).length && response.hits !== null && response.hits

  const currentPage = start / rows;
  const pageAmt = Math.ceil(numFound / rows);
  let rangeStart = currentPage - 2 < 0 ? 0 : currentPage - 2
  let rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5

  const buildRangeStart = () => {
    if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
      rangeStart = rangeEnd - 5;
      if (rangeStart < 0) {
        rangeStart = 0;
      }
    }
  }

  const buildPages = (rangeStart, rangeEnd) => {
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


  const onPageChange = (page) => {
    if (page >= pageAmt || page < 0) {
      return;
    }
    setStart({newStart: page * rows})
  }

  const renderPages = (pages) => {
    return pages && pages.map((page, i) =>
      <Button variant="outlined" color="primary" key={i} href='' onClick={() => onPageChange(page)}>{page + 1}</Button>
    )}


  return (
    <>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange( 0 )}>&lt;&lt;</Button>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(currentPage - 1)}>&lt;</Button>
        {renderPages(pages)}
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(currentPage + 1)}>&gt;</Button>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(pageAmt - 1)}>&gt;&gt;</Button>
    </>
  );
}

const mapStateToProps = (state): any => ({
  query: state.query,
  response: state.response
})

const mapDispatchToProps = {setStart}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

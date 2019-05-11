import React, {ReactElement} from "react";
import {connect} from 'react-redux'
import {setStart} from "solr-react-faceted-search"
import Button from '@material-ui/core/Button'

export const PaginationComponent: React.FC<any> = (props): ReactElement => {
  const {query, response, setStart} = props;
  const {start, rows} = query;
  const {numFound} = Object.keys(response).length && response.hits !== null && response.hits
  const pageAmt = Math.ceil(numFound / rows);
  const currentPage = start / rows;

  const onPageChange = (page, pageAmt) => {
    if (page >= pageAmt || page < 0) {
      return;
    }
    setStart({newStart: page * rows})
  }

  const renderPages = (pages) => {
    return pages.map((page, i) =>
      <Button variant="outlined" color="primary" key={i} href='' onClick={() => onPageChange(page, pageAmt)}>{page + 1}</Button>
    )}

  let rangeStart = currentPage - 2 < 0 ? 0 : currentPage - 2;
  let rangeEnd = rangeStart + 5 > pageAmt ? pageAmt : rangeStart + 5;

  if (rangeEnd - rangeStart < 5 && rangeStart > 0) {
    rangeStart = rangeEnd - 5;
    if (rangeStart < 0) {
      rangeStart = 0;
    }
  }

  let pages = [];
  for (let page = rangeStart; page < rangeEnd; page++) {
    if (pages.indexOf(page) < 0) {
      pages.push(page);
    }
  }

  return (
    <>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange( 0, pageAmt)}>&lt;&lt;</Button>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(currentPage - 1, pageAmt)}>&lt;</Button>
        {renderPages(pages)}
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(currentPage + 1, pageAmt)}>&gt;</Button>
      <Button variant="outlined" color="primary" href='' onClick={() => onPageChange(pageAmt - 1, pageAmt)}>&gt;&gt;</Button>
    </>
  );
}

const mapStateToProps = (state): any => ({
  query: state.query,
  response: state.response
})

const mapDispatchToProps = {setStart}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

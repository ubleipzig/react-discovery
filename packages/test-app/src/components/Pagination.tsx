import PropTypes from "prop-types";
import React, {ReactElement} from "react";
import {connect} from 'react-redux'
import cx from "classnames";
import {setStart} from "solr-react-faceted-search"

export const PaginationComponent: React.FC<any> = (props): ReactElement => {
  const bootstrapCss = true
  const {query, results} = props;
  const {start, rows} = query;
  const {numFound} = results;
  const pageAmt = Math.ceil(numFound / rows);
  const currentPage = start / rows;
  const {setStart} = props

  const onPageChange = (page, pageAmt) =>
  {
    if (page >= pageAmt || page < 0) {
      return;
    }
    setStart({newStart: page * rows})
  }

  const renderPage = (page, currentPage, key) =>
  {
    return (
      <li className={cx({"active": page === currentPage})} key={key}>
        <button onClick={() => onPageChange(page, pageAmt)}>{page + 1}</button>
      </li>
    );
  }

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
    <div className={cx({"panel-body": bootstrapCss, "text-center": bootstrapCss})}>
      <ul className={cx("pagination", {"pagination-sm": bootstrapCss})}>
        <li className={cx({"disabled": currentPage === 0})} key="start">
          <button onClick={() => onPageChange( 0, pageAmt)}>&lt;&lt;</button>
        </li>
        <li className={cx({"disabled": currentPage - 1 < 0})} key="prev">
          <button onClick={() => onPageChange(currentPage - 1, pageAmt)}>&lt;</button>
        </li>
        {pages.map((page, idx) => renderPage(page, currentPage, idx))}
        <li className={cx({"disabled": currentPage + 1 >= pageAmt})} key="next">
          <button onClick={() => onPageChange(currentPage + 1, pageAmt)}>&gt;</button>
        </li>
        <li className={cx({"disabled": currentPage === pageAmt - 1})} key="end">
          <button onClick={() => onPageChange(pageAmt - 1, pageAmt)}>&gt;&gt;</button>
        </li>
      </ul>
    </div>
  );
}

PaginationComponent.propTypes = {
  bootstrapCss: PropTypes.bool,
  onChange: PropTypes.func,
  query: PropTypes.object,
  results: PropTypes.object
};

const mapStateToProps = (state): any => ({
  query: state.query,
  results: state.response
})

const mapDispatchToProps = {setStart}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

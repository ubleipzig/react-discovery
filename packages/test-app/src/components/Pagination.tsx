import React, {ReactElement} from "react";
import {connect} from 'react-redux'
import {setStart} from "solr-react-faceted-search"
import Button from '@material-ui/core/Button'

interface IPagination {
  response: any;
  setStart: Function;
  size: number;
  start: number;
}

export const PaginationComponent: React.FC<any> = (props: IPagination): ReactElement => {
  const {start, size, response, setStart} = props;
  const {numFound} = Object.keys(response).length && response.hits !== null && response.hits

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
  }

  const PageControlButton = (page, label, key): ReactElement =>
    <Button
      variant="outlined"
      color="primary"
      key={key}
      href=''
      onClick={(): void => onPageChange(page)}
    >{label}
    </Button>

  const renderPages = (pages): ReactElement => {
    return pages && pages.map((page, i) =>
      PageControlButton(page, page + 1, i)
    )
  }


  return (
    <>
      {PageControlButton(0, "<<", "first")}
      {PageControlButton(currentPage - 1, "<", "previous")}
        {renderPages(pages)}
      {PageControlButton(currentPage + 1, ">", "next")}
      {PageControlButton(pageAmt - 1, ">>", "last")}
    </>
  );
}

const mapStateToProps = (state): any => ({
  size: state.query.size,
  start: state.query.start,
  response: state.response
})

const mapDispatchToProps = {setStart}

export const Pagination = connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)

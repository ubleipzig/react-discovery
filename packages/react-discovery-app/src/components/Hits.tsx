import React, {ReactElement} from "react"
import {connect} from "react-redux"
import {renderComponent} from '../react'

export interface IHits {
  hits: [];
  hitComponent: React.Component;
  numFound: number;
  searchFields: ISearchField[];
}

export interface ISearchField {
  label: string;
  field: string;
  type: string;
}

const HitsComponent: React.FC<any> = (props: IHits): ReactElement => {
  const {hits, hitComponent, searchFields} = props


  const buildHits = (hits): ReactElement => hits.hits && hits.hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i, searchFields})
  ))

  return buildHits(hits)
}

const mapStateToProps = (state): any => ({
  hits: state.response.hits,
  searchFields: state.query && state.query.searchFields,
})

export const Hits: any = connect(mapStateToProps, null)(HitsComponent)

import React, {ReactElement} from "react"
import {renderComponent} from '../react'
import {useSelector} from "react-redux"

export interface IHits {
  hitComponent: React.Component;
}

export interface ISearchField {
  label: string;
  field: string;
  type: string;
}

export const Hits: React.FC<any> = (props: IHits): ReactElement => {
  const hits = useSelector((state: any): [] => state.response.hits)
  const searchFields = useSelector((state: any): ISearchField[] =>
    state.query && state.query.searchFields)
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.hits && hits.hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i, searchFields})
  ))
  return buildHits(hits)
}


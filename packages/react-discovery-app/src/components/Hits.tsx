import React, {ReactElement} from "react"
import {getHits, getSearchFields} from "@react-discovery/solr"
import {renderComponent} from '../utils'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<any> = (props: IHits): ReactElement => {
  const hits = getHits()
  const searchFields = getSearchFields()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.hits && hits.hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i, searchFields})
  ))
  return buildHits(hits)
}


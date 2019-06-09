import React, {ReactElement} from "react"
import {getHits, getSearchFields} from "@react-discovery/solr"
import {renderComponent} from '../utils'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<IHits> = (props): ReactElement => {
  const hits = getHits()
  const searchFields = getSearchFields()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i, searchFields})
  ))

  return hits && buildHits(hits.hits)
}


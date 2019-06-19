import React, {ReactElement} from "react"
import {getHits} from "@react-discovery/solr"
import {renderComponent} from '.'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<IHits> = (props): ReactElement => {
  const hits = getHits()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i})
  ))

  return hits && buildHits(hits.hits)
}


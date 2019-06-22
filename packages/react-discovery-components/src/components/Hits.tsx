import React, {ReactElement} from "react"
import {SolrCore} from "@react-discovery/core"
import {renderComponent} from '.'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<IHits> = (props): ReactElement => {
  const hits = SolrCore.state.getHits()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i})
  ))

  return hits && buildHits(hits.hits)
}


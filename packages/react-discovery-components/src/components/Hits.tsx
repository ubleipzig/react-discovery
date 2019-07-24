import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {renderComponent} from '.'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<IHits> = (props): ReactElement => {
  const hits = ESCore.state.getHits()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, key: i})
  ))

  return hits && buildHits(hits.hits)
}


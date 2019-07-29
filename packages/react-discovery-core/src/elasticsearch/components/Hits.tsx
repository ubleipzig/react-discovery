import React, {ReactElement} from "react"
import {getHits} from "../state"
import {renderComponent} from './index'

export interface IHits {
  hitComponent: React.Component;
}

export const Hits: React.FC<IHits> = (props): ReactElement => {
  const hits = getHits()
  const {hitComponent} = props

  const buildHits = (hits): ReactElement => hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {hit, i, key: i})
  ))

  return hits && buildHits(hits.hits)
}

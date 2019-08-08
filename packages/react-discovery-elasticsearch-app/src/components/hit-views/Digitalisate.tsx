import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/core"
import {MediaGrid} from "../MediaGrid"

interface IDigitalisate {
  hit: IHit;
}

export const Digitalisate: React.FC<IDigitalisate> = (props): ReactElement => {
  const {hit} = props
  return (
    <MediaGrid hit={hit}/>
  )
}

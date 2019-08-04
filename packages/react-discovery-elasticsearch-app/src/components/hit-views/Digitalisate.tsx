import React, {ReactElement} from "react"
import {MediaGrid} from "../MediaGrid"

export const Digitalisate: React.FC<any> = (props): ReactElement => {
  const {hit} = props
  return (
    <MediaGrid hit={hit}/>
  )
}

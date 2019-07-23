import React, {ReactElement} from "react"
import {SimpleDataView} from "./SimpleDataView"
const View: React.FC<any> = (props): ReactElement => {
  const {id, viewType} = props
  return (
     <SimpleDataView id={id} key={id}/>
  )
}

export default View

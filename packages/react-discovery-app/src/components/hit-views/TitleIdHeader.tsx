import React, {ReactElement} from "react"
import {CardHeader} from "@material-ui/core"
import {InnerHtmlValue} from "./InnerHtmlValue"

interface ITitleIdHeader {
  title: string;
  id: string;
}
export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, title} = props
  return (
    <div style={{display: 'flex'}}>
      <CardHeader
        style={{width: '100%'}}
        title={<InnerHtmlValue value={title}/>}/>
      <CardHeader
        style={{textAlign: 'right', width: '30%'}}
        subheader={id}/>
    </div>
  )
}

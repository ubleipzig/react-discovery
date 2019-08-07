import React, {ReactElement} from "react"
import {useInnerHtmlValueStyles} from '../styles'

interface IInnerHtmlValue {
  classes?: any;
  value: string;
}

export const InnerHtmlValue: React.FC<IInnerHtmlValue> = (props): ReactElement => {
  const classes: any = props.classes || useInnerHtmlValueStyles({})
  const {value} = props
  return (
    <div className={classes.values} dangerouslySetInnerHTML={{__html: value}}/>
  )
}

import React, {ReactElement} from "react"
import {useInnerHtmlValueStyles} from '../styles'

interface IInnerHtmlValue {
  value: string;
}

export const InnerHtmlValue: React.FC<IInnerHtmlValue> = (props): ReactElement => {
  const classes: any = useInnerHtmlValueStyles({})
  const {value} = props
  return (
    <div className={classes.values} dangerouslySetInnerHTML={{__html: value}}/>
  )
}

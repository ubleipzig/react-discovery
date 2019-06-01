import React, {ReactElement} from "react"
import {makeStyles} from "@material-ui/core"

interface IInnerHtmlValue {
  value: string;
}

const useStyles = makeStyles((): any => ({
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}))

export const InnerHtmlValue: React.FC<IInnerHtmlValue> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {value} = props
  return (
    <div className={classes.values} dangerouslySetInnerHTML={{__html: value}}/>
  )
}

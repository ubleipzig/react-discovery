import React, {ReactElement} from "react"
import {Box} from '@material-ui/core'
import {useFlexBoxStyles} from "../styles"

export const FlexBox: React.FC<any> = (props): ReactElement => {
  const classes: any = useFlexBoxStyles({});
  return (
    <Box
      className={classes.flexBox}
    >{props.children}
    </Box>
  )
}

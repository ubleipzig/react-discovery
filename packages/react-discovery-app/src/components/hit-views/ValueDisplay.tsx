import React, {ReactElement} from "react"
import {Typography, makeStyles} from "@material-ui/core"
import {IHit} from "@react-discovery/solr"
import {InnerHtmlValue} from '.'
import {buildHighlightedValueForHit} from '../../utils'

interface IValueDisplay {
  field: string;
  hit: IHit;
  style: any;
  variant?: any | 'inherit';
}

const useStyles = makeStyles((): any => ({
  inline: {
    display: 'inline',
  },
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}))

export const ValueDisplay: React.FC<IValueDisplay> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {field, hit, style, variant} = props
  const value = buildHighlightedValueForHit(field, hit)
  return (
    <div style={style}>
      <Typography
        className={classes.inline}
        color="textSecondary"
        component="span"
        variant={variant}
      >
        <InnerHtmlValue value={value}/>
      </Typography>
    </div>
  )
}

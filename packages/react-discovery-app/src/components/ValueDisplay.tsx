import React, {ReactElement} from "react"
import {Typography, makeStyles} from "@material-ui/core"
import {buildDateFormat, buildHighlightedValueForHit} from '../utils'
import {IHit} from "@react-discovery/solr"
import {InnerHtmlValue} from '.'

interface IValueDisplay {
  field: string;
  hit: IHit;
  separator?: boolean;
  style: any;
  variant?: any | 'inherit';
}

export const useStyles = makeStyles((): any => ({
  inline: {
    display: 'inline',
  },
}))

const FieldSeparator = (): ReactElement => <>{'\u00A0\u2223\u00A0'}</>

export const ValueDisplay: React.FC<IValueDisplay> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {field, hit, separator, style, variant} = props
  const isDate = field.includes('_dt')
  const value = isDate ? buildDateFormat(field, hit) : buildHighlightedValueForHit(field, hit)
  return value ? (
      <>
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
        {separator ? <FieldSeparator/> : null}
      </>
  ) : null
}

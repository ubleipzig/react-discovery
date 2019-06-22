import React, {ReactElement} from "react"
import {buildDateFormat, buildHighlightedValueForHit} from '../utils'
import {IHit} from "@react-discovery/core"
import {InnerHtmlValue} from '.'
import {Typography} from "@material-ui/core"
import {useValueDisplayStyles} from "../styles"

interface IValueDisplay {
  field: string;
  hit: IHit;
  separator?: boolean;
  style: any;
  variant?: any | 'inherit';
}

const FieldSeparator = (): ReactElement => <>{'\u00A0\u2223\u00A0'}</>

export const ValueDisplay: React.FC<IValueDisplay> = (props): ReactElement => {
  const classes: any = useValueDisplayStyles({})
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

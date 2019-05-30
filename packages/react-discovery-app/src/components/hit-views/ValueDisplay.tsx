import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/solr"
import {makeStyles} from "@material-ui/core"

interface IValueDisplay {
  field: string;
  hit: IHit;
}

const useStyles = makeStyles((): any => ({
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}))

export const ValueDisplay: React.FC<any> = (props: IValueDisplay): ReactElement => {
  const classes: any = useStyles({})
  const {field, hit} = props
  const {_source, highlighting} = hit
  const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
  const value = [].concat(source[field] || null).filter((v): any => v !== null);
  return (
    <div className={classes.values} dangerouslySetInnerHTML={{__html: value.join(", ")}}/>
  )
}

import {Domain, useHitViewStyles} from "@react-discovery/views"
import {ESCore, IHit} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {CardContent} from "@material-ui/core"
import {FieldValueDisplay} from "@react-discovery/components"
import {getHitComponentConfig} from "@react-discovery/configuration"

interface IInfo {
  hit: IHit;
}

export const Info: React.FC<IInfo> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const componentConfig = getHitComponentConfig(Domain.INFO)
  const filteredFields = componentConfig && componentConfig.filteredFields
  const searchFields = ESCore.state.getSearchFields()
  const {hit} = props
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  return (
    <>
      {
        displayFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >{hit._source && hit._source[field.field] ?
              <FieldValueDisplay field={field} hit={hit}/> : null}
          </CardContent>)
      }
      </>
  )
}

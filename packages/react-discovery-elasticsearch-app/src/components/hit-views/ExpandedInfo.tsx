import React, {ReactElement} from "react"
import {CardContent} from "@material-ui/core"
import {ESCore} from "@react-discovery/core"
import {FieldValueDisplay} from "@react-discovery/components"
import {useHitViewStyles} from "@react-discovery/views"

export const ExpandedInfo: React.FC<any> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
    'status', 'writingStyle', 'language', 'previousOwner']
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

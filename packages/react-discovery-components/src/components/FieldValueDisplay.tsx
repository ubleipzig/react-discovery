import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {FieldLabel} from "./FieldLabel"
import {ValueDisplay} from "./ValueDisplay"


interface IFieldValueDisplay {
  field: ISearchField;
  hit: IHit;
}

export const FieldValueDisplay: React.FC<IFieldValueDisplay> = (props): ReactElement => {
  const {field, hit} = props
  return (
    <>
      <FieldLabel
        label={field.label}
      />
      <ValueDisplay
        field={field.field}
        hit={hit}
        style={{flex: 'auto'}}
      />
    </>)
}

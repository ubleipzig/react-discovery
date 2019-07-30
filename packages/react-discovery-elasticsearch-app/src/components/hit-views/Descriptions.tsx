import {
  Domain,
  EntityDisplay,
  beschreibungDisplayFields,
  facetDisplayFields
} from "@react-discovery/views"
import React, {ReactElement} from "react"
import {CardActions} from "@material-ui/core"

export const Descriptions: React.FC<any> = (props): ReactElement => {
  const {hit} = props
  const cardActions = [
    {
      displayFields: beschreibungDisplayFields,
      isNested: true,
      nestedDisplayFields: facetDisplayFields,
      type: Domain.BESCHREIBUNG
    },
  ]

  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={hit} isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  return (
    <>
      {buildCardActions(cardActions)}
    </>
  )
}

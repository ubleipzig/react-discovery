import {
  Domain,
  EntityDisplay,
  beschreibungDisplayFields,
  facetDisplayFields
} from "@react-discovery/views"
import React, {ReactElement} from "react"
import {CardActions} from "@material-ui/core"
import {IHit} from "@react-discovery/core"

interface IDescriptions {
  hit: IHit;
}

export const Descriptions: React.FC<IDescriptions> = (props): ReactElement => {
  const {hit} = props
  const cardActions = [
    {
      displayFields: beschreibungDisplayFields,
      isNested: true,
      nestedDisplayFields: facetDisplayFields,
      type: Domain.DESCRIPTION
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

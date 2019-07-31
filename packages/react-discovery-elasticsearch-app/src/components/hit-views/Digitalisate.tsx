import {
  Domain,
  EntityDisplay,
  digitalisatDisplayFields,
} from "@react-discovery/views"
import React, {ReactElement} from "react"
import {CardActions} from "@material-ui/core"

export const Digitalisate: React.FC<any> = (props): ReactElement => {
  const {hit} = props
  const cardActions = [
    {
      displayFields: digitalisatDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.DIGITALISAT
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
          hit={hit}
          isNested={item.isNested}
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

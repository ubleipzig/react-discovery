import {
  Domain,
  EntityDisplay,
  annotationDisplayFields
} from "@react-discovery/views"
import React, {ReactElement} from "react"
import {CardActions} from "@material-ui/core"
import {IHit} from "@react-discovery/core"

interface IAnnotations {
  hit: IHit;
}

export const Annotations: React.FC<IAnnotations> = (props): ReactElement => {
  const {hit} = props
  const cardActions = [
    {
      displayFields: annotationDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.ANNOTATION
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

import React, {ReactElement} from "react"
import {Typography} from "@material-ui/core"
import {useTranslation} from "react-i18next"

interface IFieldLabel {
  label: string;
}

export const FieldLabel: React.FC<IFieldLabel> = (props): ReactElement => {
  const {t} = useTranslation('vocab')
  const {label} = props
  return (
    <div style={{margin: "0 20px 0 10px", minWidth: 180}}>
      <Typography
        component="span"
      >
        {t(label)}
      </Typography>
    </div>
  )
}

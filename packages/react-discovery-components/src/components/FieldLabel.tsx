import React, {ReactElement} from "react"
import {Typography} from "@material-ui/core"
import {useFieldLabelStyles} from "../styles"
import {useTranslation} from "react-i18next"

interface IFieldLabel {
  classes?: any;
  label: string;
}

export const FieldLabel: React.FC<IFieldLabel> = (props): ReactElement => {
  const classes: any = props.classes || useFieldLabelStyles({})
  const {t} = useTranslation('vocab')
  const {label} = props
  return (
    <div className={classes.fieldLabel}>
      <Typography
        component="span"
      >
        {t(label)}
      </Typography>
    </div>
  )
}

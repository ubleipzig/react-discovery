import {
  CardContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  Typography
} from "@material-ui/core"
import React, {ReactElement} from "react"
import {ExpandMore} from "@material-ui/icons"
import {FieldLabel} from "../FieldLabel"
import {InnerHtmlValue} from "../InnerHtmlValue"
import {buildEntityCountForType} from "../../utils"
import {useHitViewStyles} from "./useHitViewStyles"
import {useTranslation} from "react-i18next"


interface INestedEntityDisplay {
  displayFields: any[];
  entity;
  type: string;
}

export const NestedEntityDisplay: React.FC<INestedEntityDisplay> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {displayFields, entity, type} = props
  const [isExpanded, setExpanded] = React.useState(true);
  const {t} = useTranslation('vocab')

  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }

  const buildEntityFields = (entityFields, type): ReactElement[] => {
    const nestedEntities = entity && entity.entities.filter((entity): boolean => entity.type_s === type)
    return nestedEntities && nestedEntities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
          <Divider component='hr'/>
          {entityFields.map((field, i): ReactElement => {
            const value = [].concat(entity[field.field] || null).filter((v): any => v !== null).join(", ")
            return (
              <CardContent
                className={classes.content}
                key={i}
              >
                <FieldLabel label={field.label}/>
                <div style={{flex: 'auto'}}>
                  <Typography
                    className={classes.inline}
                    color="textSecondary"
                    component="span"
                  >
                    <InnerHtmlValue value={value}/>
                  </Typography>
                </div>
              </CardContent>
            )
          })}
          <Divider component='hr'/>
        </div>)
    })
  }

  return (
    <ExpansionPanel
      TransitionProps={{ unmountOnExit: true }}
      defaultExpanded={Boolean(true)}
      expanded={Boolean(isExpanded)}
      onChange={handleExpandClick}

    >
      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        classes={{
          expanded: classes.expanded,
          root: classes.expansionSummaryRoot}}
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography
          className={classes.heading}>
          {entity && t(type)} <i>({buildEntityCountForType(entity.entities, type)})</i>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav">
          {buildEntityFields(displayFields, type)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


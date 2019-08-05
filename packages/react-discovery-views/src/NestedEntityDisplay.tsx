import {
  CardContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List, ListSubheader,
  Typography
} from "@material-ui/core"
import {
  InnerHtmlValue,
  buildEntityCountForType,
  buildHighlightedValueForHit, buildInnerHitCountForType
} from "@react-discovery/components"
import React, {ReactElement} from "react"
import {ESCore} from '@react-discovery/core'
import {ExpandMore} from "@material-ui/icons"
import {IDisplayField} from "."
import {useHitViewStyles} from "./useHitViewStyles"
import {useTranslation} from "react-i18next"

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

interface INestedEntityDisplay {
  displayFields: IDisplayField[];
  entity;
  type: string;
  useExpansion?: boolean;
}

export const NestedEntityDisplay: React.FC<INestedEntityDisplay> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {displayFields, entity, type, useExpansion} = props
  const [isExpanded, setExpanded] = React.useState(true);
  const {t} = useTranslation('vocab')

  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }

  const entities = entity && entity.entities ?
    entity.entities.filter((e): boolean => e[typeField] === type) :
    entity._source && entity._source[typeField] === type ? [entity] : null

  const entityCount = buildEntityCountForType(entities, type) || buildInnerHitCountForType(entities, type)

  const buildEntityFields = (entityFields): ReactElement[] => {
    return entities && entities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
          <Divider component='hr'/>
          {entityFields.map((field, i): ReactElement => {
            const value = entity.field && entity.field === 'entities.entities' ?
              buildHighlightedValueForHit(field.field, entity) : [].concat(entity[field.field] || null).filter((v): any => v !== null).join(", ")
            return (
              <CardContent
                className={classes.contentDefaultPadding}
                key={i}
              >
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

  const buildDetails = (): ReactElement =>
    <ExpansionPanelDetails>
      <List component="nav">
        {buildEntityFields(displayFields)}
      </List>
    </ExpansionPanelDetails>

  return entityCount && useExpansion ? (
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
          {entity && t(type)} <i>({entityCount})</i>
        </Typography>
      </ExpansionPanelSummary>
      {buildDetails()}
    </ExpansionPanel>
  ) : entityCount && !useExpansion ?
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {t(type)} <i>({entityCount})</i>
        </ListSubheader>
      }
    >
      {buildEntityFields(displayFields)}
    </List> :
    <Typography variant='caption'>No Matching {type} Documents</Typography>
}


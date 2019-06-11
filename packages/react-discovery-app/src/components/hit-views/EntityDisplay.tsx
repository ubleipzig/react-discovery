import {
  CardContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  Typography
} from "@material-ui/core"
import React, {Fragment, ReactElement} from "react"
import {ExpandMore} from "@material-ui/icons"
import {FieldLabel} from "../FieldLabel"
import {IHit} from "@react-discovery/solr"
import {InnerHtmlValue} from "../InnerHtmlValue"
import {NestedEntityDisplay} from '.'
import {buildEntityCountForType} from "../../utils"
import {useHitViewStyles} from "./useHitViewStyles"
import {useTranslation} from "react-i18next"


interface IEntityDisplay {
  displayFields: any[];
  hit: IHit;
  isNested?: boolean;
  nestedDisplayFields?: any[];
  type: string;
}

export const EntityDisplay: React.FC<IEntityDisplay> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {displayFields, hit, isNested, nestedDisplayFields, type} = props
  const [isExpanded, setExpanded] = React.useState(true);
  const {t} = useTranslation('vocab')

  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }

  const buildEntityFields = (entityFields, hit, type): ReactElement[] => {
    const entities = hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type)
    return entities && entities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
          <Divider component='hr'/>
          {entityFields.map((field, i): ReactElement => {
            const value = [].concat(entity[field.field] || null).filter((v): any => v !== null).join(", ")
            return (
              <Fragment key={i}>
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
                {isNested ?
                  <NestedEntityDisplay
                    displayFields={nestedDisplayFields}
                    entity={entity}
                    type='Fazikel'
                  /> : null}
              </Fragment>
            )
          })}
          <Divider component='hr'/>
        </div>)
    })
  }

  return (
    <ExpansionPanel
      defaultExpanded={Boolean(true)}
      expanded={Boolean(isExpanded)}
      onChange={handleExpandClick}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        className={classes.expansionPanelRoot}
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography
          className={classes.heading}>
          {t(type)} <i>({buildEntityCountForType(hit, type)})</i>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav">
          {buildEntityFields(displayFields, hit, type)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


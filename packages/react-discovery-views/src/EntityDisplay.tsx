import {Book, ChatBubble, ExpandMore, Image, Person} from "@material-ui/icons"
import {
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListSubheader,
  Typography,
} from "@material-ui/core"
import {ESCore, IHit} from "@react-discovery/core"
import {
  FieldLabel,
  InnerHtmlValue,
  buildEntityCountForType,
  buildHighlightedValueForHit,
  buildInnerHitCountForType,
  getParentEntityByChildIdentifier
} from "@react-discovery/components"
import {IDisplayField, NestedEntityDisplay, useHitViewStyles} from '.'
import React, {Fragment, ReactElement} from "react"
import {Domain} from './enum'
import {useTranslation} from "react-i18next"

interface IEntityDisplay {
  displayFields: IDisplayField[];
  hit: IHit;
  isNested?: boolean;
  nestedDisplayFields?: IDisplayField[];
  type: string;
  useExpansion?: boolean;
}

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

export const EntityDisplay: React.FC<IEntityDisplay> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {displayFields, hit, isNested, nestedDisplayFields, type, useExpansion} = props
  const [isExpanded, setExpanded] = React.useState(true);
  const {t} = useTranslation('vocab')
  const innerHits = hit && hit.innerHits && hit.innerHits.length && hit.innerHits.map((ih) => ih)
  const entities = hit && hit.innerHits && hit.innerHits.length ?
    hit.innerHits.map((ih) => ih) : hit._source && hit._source.entities ?
      hit._source.entities.filter((entity): boolean => entity[typeField] === type) : null
  const defaultEntities = hit && hit._source && hit._source.entities ?
    hit._source.entities.filter((entity): boolean => entity[typeField] === type) : null
  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }
  const entityCount = buildEntityCountForType(entities, type) || buildInnerHitCountForType(innerHits, type)

  const buildEntityIcon = (type): ReactElement => {
    switch (type) {
      case Domain.ANNOTATION:
        return <ChatBubble className={classes.entityIcon} fontSize='small' htmlColor='#86173e'/>
      case Domain.BESCHREIBUNG:
        return <Book className={classes.entityIcon} fontSize='small' htmlColor='#86173e'/>
      case Domain.DIGITALISAT:
        return <Image className={classes.entityIcon} fontSize='small' htmlColor='#86173e'/>
      case Domain.PERSON:
        return <Person className={classes.entityIcon} fontSize='small' htmlColor='#86173e'/>
    }
  }

  // TODO abstract parent primary field name into type
  const buildParentEntityTitleForChild = (entity) => {
    const parentEntity = getParentEntityByChildIdentifier(entity.id, defaultEntities)[0]
    return parentEntity[Domain.DESCRIPTION_TITLE_FIELD]
  }

  const buildEntityFields = (displayFields: IDisplayField[]): ReactElement[] => {
    return entities && entities.map((entity: any, i: number): any =>
      <div key={i}>
        <Card className={classes.root}>
          <div style={{display: 'flex'}}>
            <div>
              {displayFields.map((field, i): ReactElement => {
                const value = entity.field && entity.field === 'entities' ?
                  buildHighlightedValueForHit(field.field, entity) :
                  entity.field === 'entities.entities' && field.field === Domain.DESCRIPTION_TITLE_FIELD ? buildParentEntityTitleForChild(entity) :
                    [].concat(entity[field.field] || null).filter((v): any => v !== null).join(", ")
                return (
                  <Fragment key={i}>
                    <CardContent
                      className={classes.content}
                      key={i}
                    >
                      {field.field !== Domain.DESCRIPTION_TITLE_FIELD ? <FieldLabel label={field.label}/> : null}
                      {field.field !== Domain.DESCRIPTION_TITLE_FIELD ?
                        <div style={{flex: 'auto'}}>
                          <Typography
                            className={classes.inline}
                            color="textSecondary"
                            component="span"
                          >
                            <InnerHtmlValue value={value}/>
                          </Typography>
                        </div> :
                        <div style={{flex: 'auto', padding: 10}}>
                          <Typography
                            className={classes.inline}
                            component="span"
                            variant='subtitle2'
                          >
                            <InnerHtmlValue value={value}/>
                          </Typography>
                        </div>
                      }
                    </CardContent>
                    {isNested ?
                      <NestedEntityDisplay
                        displayFields={nestedDisplayFields}
                        entity={entity}
                        type={Domain.FASZIKEL}
                        useExpansion={false}
                      /> : null}
                  </Fragment>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    )
  }

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
          {t(type)} <i>({entityCount})</i>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav">
          {buildEntityFields(displayFields)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : entityCount && !useExpansion ?
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {buildEntityIcon(type)} {t(type)} <i>({entityCount})</i>
        </ListSubheader>
      }
    >
      {buildEntityFields(displayFields)}
    </List> :
    <Typography variant='caption'>No Matching {type} Documents</Typography>
}


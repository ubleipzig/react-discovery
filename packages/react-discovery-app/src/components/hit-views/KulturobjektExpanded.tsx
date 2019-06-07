import {
  Card,
  CardActions,
  CardContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  Typography,
} from "@material-ui/core"
import {FieldLabel, RandomThumbnail, TitleIdHeader, ValueDisplay, useHitViewStyles, } from '.'
import React, {ReactElement} from "react"
import {buildEntityCountForType, buildHighlightedValueForHit} from "../../utils"
import {ExpandMore} from '@material-ui/icons'
import {IHit} from "@react-discovery/solr"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: any;
}

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const [isExpanded, setExpanded] = React.useState(false);
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  // TODO add this to configuration
  const filteredFields = ['material', 'format', 'originPlace', 'originDate', 'formType',
    'status', 'writingStyle', 'language', 'previousOwner']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('titel_t', hit)

  const handleExpandClick = (panel): any => ({}, isExpanded): void => {
    setExpanded(isExpanded ? panel : false)
  }

  const buildEntityFields = (entityFields, type): ReactElement[] => {
    const entities = hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type)
    return entities && entities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
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
                    <div className={classes.values} dangerouslySetInnerHTML={{__html: value}} key={i}/>
                  </Typography>
                </div>
              </CardContent>
            )
          })}
          <Divider component='hr'/>
        </div>)
    })
  }

  // TODO add this to configuration
  const digitalisatDisplayFields = [
    {field: 'digitalisatDescription_t', label: 'Description'},
    {field: 'digitalisatManifestId_s', label: 'Manifest'}
  ]

  const beschreibungDisplayFields = [
    {field: 'beschreibungText_t', label: 'Text'},
  ]

  const buildExpansionPanelForType = (displayFields, type): ReactElement => {
    return (
      <ExpansionPanel
        expanded={Boolean(isExpanded === type)}
        onChange={handleExpandClick(type)}
      >
        <ExpansionPanelSummary
          aria-controls="panel1bh-content"
          expandIcon={<ExpandMore />}
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}>
            {type} <i>({buildEntityCountForType(hit, type)})</i>
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

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          <ValueDisplay
            field={'subtitel_t'}
            hit={hit}
            style={{display: 'flex', padding: '10px'}}
            variant='h6'
          />
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <FieldLabel label={field.label}/>
              <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
            </CardContent>)}
          <CardActions disableSpacing>
            {buildExpansionPanelForType(digitalisatDisplayFields, 'Digitalisat')}
          </CardActions>
          <CardActions disableSpacing>
            {buildExpansionPanelForType(beschreibungDisplayFields, 'Beschreibung')}
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default KulturobjektExpanded
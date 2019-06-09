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
import {FieldLabel, InnerHtmlValue, Thumbnail, TitleIdHeader, ValueDisplay, ViewSwitcherToggle} from '..'
import React, {ReactElement} from "react"
import {buildEntityCountForType, buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"
import {ExpandMore} from '@material-ui/icons'
import {IHit} from "@react-discovery/solr"
import {useHitViewStyles} from '.'
import {useTranslation} from "react-i18next"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: any;
}

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const [isExpanded, setExpanded] = React.useState(true);
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  // TODO add this to configuration
  const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
    'status', 'writingStyle', 'language', 'previousOwner']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('titel_t', hit)
  const {t} = useTranslation('vocab')

  const handleExpandClick = (): void => {
    setExpanded(!isExpanded)
  }

  const buildEntityFields = (entityFields, type): ReactElement[] => {
    const entities = hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type)
    return entities && entities.map((entity, i): ReactElement => {
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

  // TODO add this to configuration
  const digitalisatDisplayFields = [
    {field: 'digitalisatDescription_t', label: 'Description'},
    {field: 'digitalisatManifestId_s', label: 'Manifest'}
  ]

  const beschreibungDisplayFields = [
    {field: 'beschreibungText_t', label: 'Text'},
  ]

  const personDisplayFields = [
    {
      field: "personFullname_t",
      label: "personFullName",
    },
    {
      field: "personBirthDate_dt",
      label: "personBirthDate",
    },
    {
      field: "personDeathDate_dt",
      label: "personDeathDate",
    },
    {
      field: "personBirthPlace_t",
      label: "personBirthPlace",
    },
    {
      field: "personDeathPlace_t",
      label: "personDeathPlace",
    },
    {
      field: "personWorkingPlace_t",
      label: "personWorkingPlace",
    },
    {
      field: "personOccupation_t",
      label: "personOccupation",
    },
    {
      field: "personGender_s",
      label: "personGender",
    },
    {
      field: "personAlternateNames_ss",
      label: "personAlternateNames",
    },
  ]

  const buildExpansionPanelForType = (displayFields, type): ReactElement => {
    return (
      <ExpansionPanel
        defaultExpanded={Boolean(true)}
        expanded={Boolean(isExpanded)}
        onChange={handleExpandClick}
      >
        <ExpansionPanelSummary
          aria-controls="panel1bh-content"
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
            {buildEntityFields(displayFields, type)}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  return hit ? (
    <Card className={classes.root} key={i}>
      <ViewSwitcherToggle/>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
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
          <CardActions disableSpacing>
            {buildExpansionPanelForType(personDisplayFields, 'Person')}
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default KulturobjektExpanded

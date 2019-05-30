import {RandomThumbnail, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader'
import Divider from "@material-ui/core/Divider"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"

interface IDefaultItemComponent {
  classes: any;
  hit: {
    _source: any;
    highlighting: any;
  };
  i: number;
  searchFields: any;
}

const useStyles = makeStyles((theme): any => ({
  content: {
    display: 'flex',
    flex: '1 0 auto',
    padding: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  inline: {
    display: 'inline',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex-root',
    marginBottom: '5px',
  },
}));

const HspExpandedHitComponent: React.FC<any> = (props: IDefaultItemComponent): ReactElement => {
  const [isExpanded, setExpanded] = React.useState(false);
  const classes: any = useStyles({})
  const {hit, i, searchFields} = props
  // TODO add this to configuration
  const filteredFields = ['Stoff', 'Format', 'Entstehungsort', 'Entstehungsdatum', 'Formtyp',
    'Status', 'Schrift', 'Schreibsprache', 'Vorbesitzer']
  const subtitel = hit && hit._source['subtitel_t']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  const handleExpandClick = (panel): any => ({}, isExpanded): void => {
    setExpanded(isExpanded ? panel : false)
  }

  const buildEntityCountForType = (type): number => {
    return hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type).length
  }

  const buildEntityFields = (entityFields, type): any => {
    const entities = hit && hit._source.entities && hit._source.entities.filter((entity): boolean => entity.type_s === type)
    return entities && entities.map((entity, i): ReactElement => {
      return (
        <div key={i}>
          {entityFields.map((field, i): ReactElement => {
            const value = [].concat(entity[field.field] || null).filter((v): any => v !== null);
            return (
              <CardContent
                className={classes.content}
                key={i}
              >
                <div style={{margin: "0 20px 0 10px", minWidth: 180}}>
                  <Typography
                    component="span"
                  >
                    {field.label || field.field}
                  </Typography>
                </div>
                <div style={{flex: 'auto'}}>
                  <Typography
                    className={classes.inline}
                    color="textSecondary"
                    component="span"
                  >
                    <div className={classes.values} dangerouslySetInnerHTML={{__html: value.join(", ")}} key={i}/>
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
          expandIcon={<ExpandMoreIcon />}
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}>
            {type} <i>({buildEntityCountForType(type)})</i>
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

  return (
    <Card className={classes.root} key={i}>
      <div style={{display: 'flex'}}>
        <CardHeader
          style={{width: '100%'}}
          title={hit && hit._source.titel_t}/>
        <CardHeader
          style={{textAlign: 'right', width: '30%'}}
          subheader={hit && hit._source.id}/>
      </div>
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          <div style={{display: 'flex', padding: '10px'}}>
            <Typography
              component="span"
              variant='subtitle2'
            >
              {subtitel}
            </Typography>
          </div>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <div style={{margin: "0 20px 0 10px", minWidth: 180}}>
                <Typography
                  component="span"
                >
                  {field.label || field.field}
                </Typography>
              </div>
              <div style={{flex: 'auto'}}>
                <Typography
                  className={classes.inline}
                  color="textSecondary"
                  component="span"
                >
                  <ValueDisplay field={field.field} hit={hit}/>
                </Typography>
              </div>
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
  )
}

export default HspExpandedHitComponent

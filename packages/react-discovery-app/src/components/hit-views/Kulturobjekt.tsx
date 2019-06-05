import {Book, Image} from '@material-ui/icons'
import {Card, CardActions, CardContent, Typography, makeStyles} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import {buildEntityCountForType, buildHighlightedValueForHit} from "../../utils"
import {IHit} from "@react-discovery/solr"


interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
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
  inline: {
    display: 'inline',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex-root',
    marginBottom: '5px',
  },
}));

const DIGITALISAT = 'Digitalisat'
const BESCHREIBUNG = 'Beschreibung'

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {hit, i, searchFields} = props
  const title = buildHighlightedValueForHit('titel_t', hit)
  const filteredFields = ['material', 'format', 'originPlace', 'originDate', 'formType',
    'status', 'writingStyle', 'language', 'previousOwner']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          <CardContent
            className={classes.content}
          >
            <ValueDisplay
              field={'subtitel_t'}
              hit={hit}
              style={{flex: 'auto'}}
              variant='h6'
            />
          </CardContent>
          <CardContent className={classes.content}>
            {displayFields.map((field, key): ReactElement =>
              <>
              <ValueDisplay field={field.field} hit={hit} key={key} style={{flex: 'auto'}} variant='body2'/>
                {'\u00A0\u2223\u00A0'}
              </>)}
          </CardContent>
          <CardActions disableSpacing>
            <Image fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {DIGITALISAT} <i>({buildEntityCountForType(hit, DIGITALISAT)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {BESCHREIBUNG} <i>({buildEntityCountForType(hit, BESCHREIBUNG)})</i>
            </Typography>
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default Kulturobjekt

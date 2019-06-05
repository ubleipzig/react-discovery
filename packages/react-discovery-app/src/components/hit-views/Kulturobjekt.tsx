import {Card, CardContent, ExpansionPanelSummary, makeStyles, Typography} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/solr"
import {buildEntityCountForType, buildHighlightedValueForHit} from "../../utils"

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
  const {hit, i} = props
  const title = buildHighlightedValueForHit('titel_t', hit)
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
              variant='subtitle1'
            />
            <Typography
              className={classes.heading}>
              {DIGITALISAT} <i>({buildEntityCountForType(hit, DIGITALISAT)})</i>
            </Typography>
            <Typography
              className={classes.heading}>
              {BESCHREIBUNG} <i>({buildEntityCountForType(hit, BESCHREIBUNG)})</i>
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  ) : null
}

export default Kulturobjekt

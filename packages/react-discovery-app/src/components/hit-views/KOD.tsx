import {Card, CardContent, makeStyles} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/solr"
import {buildHighlightedValueForHit} from "../../utils"

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

const KOD: React.FC<IDefaultItemComponent> = (props): ReactElement => {
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
          </CardContent>
        </div>
      </div>
    </Card>
  ) : null
}

export default KOD

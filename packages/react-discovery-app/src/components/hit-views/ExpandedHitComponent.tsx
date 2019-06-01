import {Card, CardContent, makeStyles} from "@material-ui/core"
import {FieldLabel, RandomThumbnail, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/solr"

interface IExpandedHitComponent {
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

const ExpandedHitComponent: React.FC<IExpandedHitComponent> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {hit, i, searchFields} = props

  return (
    <Card className={classes.root} key={i}>
      <RandomThumbnail/>
      <div className={classes.details}>
        {searchFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >
            <FieldLabel label={field.label}/>
            <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
          </CardContent>)}
      </div>
    </Card>
  )
}

export default ExpandedHitComponent

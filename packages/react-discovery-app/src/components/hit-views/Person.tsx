import {Card, CardContent, makeStyles} from "@material-ui/core"
import {FieldLabel, RandomThumbnail, TitleIdHeader, ValueDisplay} from '.'
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit} from "../../utils"

interface IPerson {
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
  inline: {
    display: 'inline',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex-root',
    marginBottom: '5px',
  },
}));

const Person: React.FC<IPerson> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {hit, i, searchFields} = props
  const filteredFields = ['personBirthDate', 'personDeathDate', 'personBirthPlace',
    'personDeathPlace', 'personWorkingPlace', 'personOccupation']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('personFullname_t', hit)

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <FieldLabel label={field.label}/>
              <ValueDisplay
                field={field.field}
                hit={hit}
                style={{flex: 'auto'}}
              />
            </CardContent>)}
        </div>
      </div>
    </Card>
  ) : null
}

export default Person

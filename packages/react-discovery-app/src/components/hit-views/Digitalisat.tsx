import {Card, CardContent, makeStyles} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, ValueDisplay} from '.'
import React, {ReactElement} from "react"

interface IDigitalisat {
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

const Digitalisat: React.FC<IDigitalisat> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {hit, i, searchFields} = props
  const filteredFields = ['DigitalisatDescription', 'Manifest']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={hit._source.titel_t}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
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

export default Digitalisat

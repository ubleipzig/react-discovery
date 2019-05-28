import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader'
import {RandomThumbnail} from '.'
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"

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
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}));

const Digitalisat: React.FC<any> = (props: IDigitalisat): ReactElement => {
  const classes: any = useStyles()
  const {hit, i, searchFields} = props
  const filteredFields = ['DigitalisatDescription', 'Manifest']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  const renderValue = (field, hit): ReactElement => {
    const {_source, highlighting} = hit
    const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
    const value = [].concat(source[field] || null).filter((v): any => v !== null);
    return (
      <div className={classes.values} dangerouslySetInnerHTML={{__html: value.join(", ")}}/>
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
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <div style={{flex: 'auto'}}>
                <Typography
                  className={classes.inline}
                  color="textSecondary"
                  component="span"
                >
                  {renderValue(field.field, hit)}
                </Typography>
              </div>
            </CardContent>)}
        </div>
      </div>
    </Card>
  )
}

export default Digitalisat

import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader'
import Typography from "@material-ui/core/Typography"
import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import {makeStyles} from "@material-ui/core"
import {buildRandomUBLThumbnail} from "../../utils"

interface IDescriptionHitComponent {
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
  cover: {
    padding: 20,
    width: '8%',
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

const Beschreibung: React.FC<any> = (props: IDescriptionHitComponent): ReactElement => {
  const classes: any = useStyles()
  const {hit, i, searchFields} = props
  const displayFields = searchFields.filter((sf): boolean => sf.field === 'beschreibungText_t')

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
        <CardMedia
          alt="Placeholder"
          className={classes.cover}
          component="img"
          height="140"
          image={buildRandomUBLThumbnail()}
          title="Thumbnail"
        />
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

export default Beschreibung

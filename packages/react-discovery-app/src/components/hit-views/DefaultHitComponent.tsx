import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import {RandomThumbnail} from '.'
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"

interface IDefaultItemComponent {
  classes: any;
  hit: {};
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
    display: 'flex',
    marginBottom: '5px',
  },
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}));

const DefaultHitComponent: React.FC<any> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useStyles()
  const {hit, i, searchFields} = props

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
      <RandomThumbnail/>
      <div className={classes.details}>
        {searchFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >
            <div style={{margin: "0 20px 0 10px", minWidth: 120}}>
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
                {renderValue(field.field, hit)}
              </Typography>
            </div>
          </CardContent>)}
      </div>
    </Card>
  )
}

export default DefaultHitComponent

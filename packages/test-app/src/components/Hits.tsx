import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"
import {connect} from "react-redux"

export interface IHits {
  hits: [];
  numFound: number;
  searchFields: ISearchField[];
}

export interface ISearchField {
  label: string;
  field: string;
  type: string;
}

const useStyles = makeStyles((theme): any => ({
  root: {
    display: 'flex',
    marginBottom: '5px',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flex: '1 0 auto',
    padding: 0,
    display: 'flex'
  },
  cover: {
    padding: 20,
    width: '8%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  inline: {
    display: 'inline',
  },
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}));

const HitsComponent: React.FC<any> = (props: IHits): ReactElement => {
  const {hits, searchFields} = props
  const classes: any = useStyles()

  const renderValue = (field, hit): ReactElement => {
    const {_source, highlighting} = hit
    const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
    const value = [].concat(source[field] || null).filter((v): any => v !== null);
    return (
      <div className={classes.values} dangerouslySetInnerHTML={{__html: value.join(", ")}}/>
    )
  }

  const getRandomInt = (min, max): string => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInt = Math.floor(Math.random() * (max - min)) + min;
    return randomInt.toString()
  }

  const buildRandomUBLThumbnail = (): string => {
    const page = getRandomInt(1, 3).padStart(8, "0")
    const manifestId = getRandomInt(300, 12000).padStart(10, "0")
    const prefix = manifestId.substring(4, 8)
    return `https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/${prefix}/${manifestId}/${page}.jpx/full/170,/0/default.jpg`
  }

  const buildHits = (hits): ReactElement => hits.hits && hits.hits.map((hit, i): ReactElement => (
    <Card className={classes.root} key={i}>
      <CardMedia
        className={classes.cover}
        component="img"
        alt="Placeholder"
        height="140"
        image={buildRandomUBLThumbnail()}
        title="Thumbnail"
      />
      <div className={classes.details}>
        {searchFields.map((field, i): ReactElement =>
          <CardContent
            className={classes.content}
            key={i}
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
                color="textSecondary"
                className={classes.inline}
                component="span"
              >
                {renderValue(field.field, hit)}
              </Typography>
            </div>
          </CardContent>
        )}
      </div>
    </Card>))

  return buildHits(hits)
}

const mapStateToProps = (state): any => ({
  searchFields: state.query && state.query.searchFields,
  hits: state.response.hits,
})

export const Hits: any = connect(mapStateToProps, null)(HitsComponent)

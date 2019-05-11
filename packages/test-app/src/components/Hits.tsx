import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"
import {connect} from "react-redux"

export interface IHits {
  hits: []
  numFound: number
  searchFields: ISearchField[]
}

export interface ISearchField {
  label: string
  field: string
  type: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flex: '1 0 auto',
    padding: 0,
    display: 'flex'
  },
  inline: {
    display: 'inline',
  },
}));

const HitsComponent: React.FC<any> = (props: IHits): ReactElement => {
  const {hits, searchFields} = props
  const classes = useStyles()
  const renderValue = (field, hit) => {
    const value = [].concat(hit[field] || null).filter((v) => v !== null);
    return value.join(", ");
  }

    const buildHits = (hits) => hits.hits && hits.hits.map((hit, i) => (
      <Card key={i}>
        {searchFields.map((field, i) =>
          <CardContent
            className={classes.content}
            key={i}
          >
            <div style={{margin: "0 20px 0 10px", width: 120}}>
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
      </Card>))

  return buildHits(hits)
}

const mapStateToProps = (state): any => ({
  searchFields: state.query && state.query.searchFields,
  hits: state.response.hits,
})

export const Hits: any = connect(mapStateToProps, null)(HitsComponent)

import React, {ReactElement} from "react"
import {makeStyles} from "@material-ui/core"
import {connect} from "react-redux"
import {renderComponent} from '../react'

export interface IHits {
  hits: [];
  hitComponent: React.Component;
  numFound: number;
  searchFields: ISearchField[];
}

export interface ISearchField {
  label: string;
  field: string;
  type: string;
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
    display: 'flex',
    marginBottom: '5px',
  },
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}));

const HitsComponent: React.FC<any> = (props: IHits): ReactElement => {
  const {hits, hitComponent, searchFields} = props
  const classes: any = useStyles()

  const buildHits = (hits): ReactElement => hits.hits && hits.hits.map((hit, i): ReactElement => (
    renderComponent(hitComponent, {classes, hit, key: i, searchFields})
  ))

  return buildHits(hits)
}

const mapStateToProps = (state): any => ({
  hits: state.response.hits,
  searchFields: state.query && state.query.searchFields,
})

export const Hits: any = connect(mapStateToProps, null)(HitsComponent)

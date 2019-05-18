import React, {ReactElement} from "react"
import {connect} from "react-redux"
import {setDisMaxQuery, setSelectedFilters, setStart} from "solr-react-faceted-search"
import Chip from '@material-ui/core/Chip'
import List from "@material-ui/core/List"
import { makeStyles } from '@material-ui/core/styles'

interface IGroupSelectedFilters {
  filters: IFilters;
  setDisMaxQuery: Function;
  setSelectedFilters: Function;
  setStart: Function;
  stringInput: string;
}

interface IFilters {
  [field: string]: string[];
}

const useStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  icon: {
    fontSize: 20,
  },
}))


const GroupSelectedFiltersComponent: React.FC<any> = (props: IGroupSelectedFilters): ReactElement => {
  const {filters, setSelectedFilters, setStart} = props
  const classes: any = useStyles()

  const onClose = (field: any, filter: any): void => {
    const newFilters = filters[field].filter((f): any => f !== filter)
    setSelectedFilters({field, filters: newFilters})
    setStart({newStart: 0})
  }

  const buildFilters = (filters): any => {
    const values = Object.values(filters)
    return values && values[0] !== undefined && Object.entries(filters).map(([field, values]): any =>
      (values as []).map((val, key): ReactElement => {
        return (
          <Chip
            className={classes.chip}
            color="primary"
            component='div'
            key={key}
            label={val}
            onDelete={(): void => onClose(field, val)}
          />)
      }))
  }

  return (
    <List component="nav" style={{display: 'flex'}}>
      {buildFilters(filters)}
    </List>
  )
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters
})

const mapDispatchToProps = {setDisMaxQuery, setSelectedFilters, setStart}

export const GroupSelectedFilters = connect(mapStateToProps, mapDispatchToProps)(GroupSelectedFiltersComponent)

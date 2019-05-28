import React, {ReactElement} from "react"
import {setSelectedFilters, setStart} from "@react-discovery/solr"
import {useDispatch, useSelector} from "react-redux"
import Chip from '@material-ui/core/Chip'
import List from "@material-ui/core/List"
import { makeStyles } from '@material-ui/core/styles'

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

export const GroupSelectedFilters: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles()
  const dispatch = useDispatch()
  const filters = useSelector((state: any): IFilters => state.query.filters)

  const onClose = (field: any, filter: any): void => {
    const newFilters = filters[field].filter((f): any => f !== filter)
    dispatch(setSelectedFilters({field, filters: newFilters}))
    dispatch(setStart({newStart: 0}))
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


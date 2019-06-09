import {Chip, List, makeStyles} from '@material-ui/core'
import React, {ReactElement} from "react"
import {getFilters, setSelectedFilters, setStart} from "@react-discovery/solr"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  icon: {
    fontSize: 20,
  },
}))

export const GroupSelectedFilters: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const filters = getFilters()

  const onClose = (field: string, filter: any): void => {
    const newFilters = filters[field].filter((f): boolean => f !== filter)
    dispatch(setSelectedFilters({field, filters: newFilters}))
    dispatch(setStart({start: 0}))
  }

  const buildFilters = (filters): ReactElement[] => {
    const values = Object.values(filters)
    return values && values[0] !== undefined && Object.entries(filters).map(([field, values]): any =>
      (values as []).map((val, key): ReactElement => {
        return (
          <Chip
            className={classes.chip}
            color="primary"
            component='div'
            data-testid='selected-filter'
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


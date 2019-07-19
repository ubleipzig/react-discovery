import {Chip, List} from '@material-ui/core'
import {ESCore, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {IOverridableStyledComponent} from ".."
import {useDispatch} from "react-redux"
import {useGroupSelectedFiltersStyles} from '../styles'

export const GroupSelectedFilters: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useGroupSelectedFiltersStyles({})
  const dispatch = useDispatch()
  const filters = SolrCore.state.getFilters()

  const onClose = (field: string, filter: any): void => {
    const newFilters = filters[field].filter((f): boolean => f !== filter)
    dispatch(SolrCore.state.setSelectedFilters({field, filters: newFilters}))
    dispatch(SolrCore.state.setStart({start: 0}))
    dispatch(ESCore.state.setFrom({from: 0}))
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


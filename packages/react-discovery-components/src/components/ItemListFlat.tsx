import {Button, Divider, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import React, {ReactElement} from "react"
import {getCurrentCollection, setRefinementListFilterSize} from '@react-discovery/configuration'
import {ESCore} from "@react-discovery/core"
import {useDispatch} from "react-redux"
import {useItemListStyles} from '../styles'
import {useTranslation} from "react-i18next"

export const ItemListFlat: React.FC<any> = (props): ReactElement => {
  const classes: any = props.classes || useItemListStyles({})
  const dispatch = useDispatch()
  const {field, id, label, size} = props
  const aggregation = ESCore.state.getAggregation(field)
  const filters = ESCore.state.getFiltersForField(field)
  const stringInput = ESCore.state.getStringInput()
  const currentCollection = getCurrentCollection()
  const {t} = useTranslation()

  const handleShowMore = (filterName): void => {
    const newSize = size + 10
    dispatch(setRefinementListFilterSize({currentCollection, filterName, size: newSize}))
    dispatch(ESCore.state.setSelectedFilters({field, filters: []}))
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    dispatch(ESCore.state.setSelectedFilters({field, filters: newFilters}))
    dispatch(ESCore.state.setQueryInput({stringInput}))
    dispatch(ESCore.state.setFrom({from: 0}))
  }

  const actions = (aggregation): ReactElement => {
    return aggregation.buckets.map((bucket, i): any => {
      return (
        <ListItem
          button={true}
          component='div'
          data-testid={`item-${i}`}
          dense
          disableGutters={true}
          key={bucket.key}
          onClick={(): void => handleChange(bucket.key)}
          role={undefined}
        >
          <ListItemText
            className={classes.content}
            primary={
              <Typography
                className={classes.grow}
                color='textSecondary'
                component="div"
                noWrap={true}
                variant='body2'
              >
                {bucket.key}
              </Typography>
            }
            secondary={
              <Typography
                className={classes.inline}
                color="textSecondary"
                component="div"
                variant="body2"
              >
                {bucket.doc_count}
              </Typography>
            }/>
        </ListItem>
      )
    })
  }

  return (
    <List
      component="nav"
      style={{paddingRight: 32, width: '100%'}}
    >
      <Typography
        className={classes.inline}
        color="textPrimary"
        component="div"
        variant="button"
      >
        {label}
      </Typography>
      <Divider style={{margin: 12, marginLeft: 0}} variant="fullWidth"/>
      {aggregation && actions(aggregation)}
      <Button
        color='primary'
        href=''
        onClick={(): void => handleShowMore(id)}
        size="small"
        variant="outlined"
      >
        {t('viewMore')}
      </Button>
    </List>
  )
}

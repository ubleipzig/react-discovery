import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
import {Divider, IconButton, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {FlexBox} from '.'
import {IOverridableStyledComponent} from ".."
import {ISortField} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useSortingSelectorStyles} from "../styles"
import {useTranslation} from "react-i18next"

export const SortingListFlat: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const {t} = useTranslation('vocab')
  const classes: any = props.classes || useSortingSelectorStyles({})
  const dispatch = useDispatch()
  const sortFields = ESCore.state.getSortFields()
  const [sortOrder, setSortOrder] = React.useState('asc')

  const handleChange = (field): void => {
    const newSortFields = sortFields.reduce((acc, currVal): any => {
      let val
      if (currVal.field === field) {
        val = {
          ...currVal,
          isSelected: true
        }
      } else {
        val = {
          ...currVal,
          isSelected: false
        }
      }
      return [...acc, val]
    }, [])
    const sorted = newSortFields.sort((a: any, b: any): any => (a.isSelected === b.isSelected) ? 0 : a.isSelected ? -1 : 1)
    const [currentSortSelection] = sorted
    dispatch(ESCore.state.setSortFields({sortFields: sorted}))
    setSortOrder(currentSortSelection.order)
  }

  const handleSortOrder = (value): void => {
    if (value !== sortOrder) {
      setSortOrder(value)
      const order = {
        order: value
      }
      const [currentSortField] = sortFields
      const newSortField = {...currentSortField, ...order}
      const newSortFields = sortFields.map((sf, i): ISortField => {
        if (i === 0) {
          return newSortField
        }
        return sf
      })
      dispatch(ESCore.state.setSortFields({sortFields: newSortFields}))
    }
  }

  const buildSortOrderButton = (): ReactElement => {
    if (sortOrder === 'asc') {
      return (
        <IconButton
          aria-label="Sort Descending"
          className={classes.button}
          data-testid='sorting-order-desc'
          href=''
          onClick={(): void => handleSortOrder('desc')}
          size='small'
        >
          <ArrowUpward/>
        </IconButton>)
    } else {
      return (
        <IconButton
          aria-label="Sort Ascending"
          className={classes.button}
          data-testid='sorting-order-asc'
          href=''
          onClick={(): void => handleSortOrder('asc')}
          size='small'
        >
          <ArrowDownward/>
        </IconButton>)
    }
  }

  const actions = (): any => {
    return sortFields.map((sf, i): any => {
      return (
        <ListItem
          button={true}
          component='div'
          data-testid={`item-${i}`}
          dense
          disableGutters={true}
          key={i}
          onClick={(): void => handleChange(sf.field)}
          role={undefined}
        >
          <ListItemText
            className={classes.content}
            primary={
              <Typography
                className={classes.grow}
                color='textSecondary'
                component="div"
                variant='body2'
              >
                {t(sf.label)}
              </Typography>
            }
          />
        </ListItem>
      )
    })
  }

  return sortFields ? (
    <List
      component="nav"
      style={{minWidth: 100, paddingRight: 32, width: '100%'}}
    >
      <FlexBox>
        <Typography
          className={classes.inline}
          color="textPrimary"
          component="div"
          variant="button"
        >
          Sort By
        </Typography>
        <div style={{flexGrow: 1}}/>
        {buildSortOrderButton()}
      </FlexBox>
      <Divider style={{margin: 12, marginLeft: 0}} variant="fullWidth"/>
      {actions()}
    </List>
  ) : null
}

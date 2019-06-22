import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, {ReactElement} from "react"
import {SolrCore} from "@react-discovery/core"
import {ExpandMore} from '@material-ui/icons'
import {useDispatch} from "react-redux"
import {useItemListStyles} from '../styles'

export interface IItemListProps {
  classes?: any;
  field: string;
  key: number;
  label: string;
}

export const ItemList: React.FC<IItemListProps> = (props): ReactElement => {
  const classes: any = props.classes || useItemListStyles({})
  const dispatch = useDispatch()
  const {field, label} = props
  const aggregation = SolrCore.state.getAggregation(field)
  const filters = SolrCore.state.getFiltersForField(field)
  const stringInput = SolrCore.state.getStringInput()
  const [isExpanded, setExpanded] = React.useState(false)

  const handleExpand = (panel): any => ({}, isExpanded): void => { // eslint-disable-line no-empty-pattern
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    dispatch(SolrCore.state.setSuggest({suggest: false}))
    dispatch(SolrCore.state.setSelectedFilters({field, filters: newFilters}))
    dispatch(SolrCore.state.setQueryInput({stringInput}))
    dispatch(SolrCore.state.setStart({start: 0}))
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
                component="div"
                variant='body2'
              >
                {bucket.key}
              </Typography>
            }
            secondary={
              <Typography
                className={classes.inline}
                color="textPrimary"
                component="div"
                variant="body2"
              >
                {bucket.docCount}
              </Typography>
            }/>
        </ListItem>
      )
    })
  }

  const PANEL_ID = 'panel1'

  return (
    <ExpansionPanel
      expanded={Boolean(isExpanded)}
      onChange={handleExpand(PANEL_ID)}
    >
      <ExpansionPanelSummary
        aria-controls="panel1bh-content"
        classes={{
          expanded: classes.expanded,
          root: classes.expansionSummaryRoot}}
        data-testid={`item-list-expansion-panel`}
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List
          component="nav"
          style={{width: '100%'}}
        >
          {aggregation && actions(aggregation)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

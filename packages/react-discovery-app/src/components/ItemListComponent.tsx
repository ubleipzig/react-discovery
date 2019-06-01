import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  IAggregation,
  getAggregation,
  getFiltersForField,
  setSelectedFilters,
  setStart,
  setSuggest
} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {ExpandMore} from '@material-ui/icons'
import {useDispatch} from "react-redux"

export interface IListProps {
  toggleItem: (key: string) => void;
  setItems: (keys: string[]) => void;
  aggregation: IAggregation;
  countFormatter?: (count: number) => string|number;
  selectedItems: string[];
  docCount?: number;
  disabled?: boolean;
  mod?: string;
  className?: string;
  showCount?: boolean;
  translate?: (s: string) => string;
  multiselect?: boolean; // if true, uses toggleItem, else uses setItems
}

export interface IItemListProps extends IListProps {
  field: string;
  label: string;
}

const useStyles = makeStyles((theme): any => ({
  content: {
    display: 'flex',
    flex: '1 0 auto',
    padding: 0,
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  inline: {
    display: 'inline',
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
}))

export const ItemList: React.FC<any> = (props: IItemListProps): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const {field, label} = props
  const aggregation = getAggregation(field)
  const filters = getFiltersForField(field)
  const [isExpanded, setExpanded] = React.useState(false)

  const handleExpand = (panel): any => ({}, isExpanded): void => { // eslint-disable-line no-empty-pattern
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    dispatch(setSuggest({suggest: false}))
    dispatch(setSelectedFilters({field, filters: newFilters}))
    dispatch(setStart({newStart: 0}))
  }

  const actions = (aggregation): ReactElement => {
    return aggregation.buckets.sort((a, b): any => (a.docCount < b.docCount) ? 1 : -1)
      .filter((bucket): any => bucket.docCount > 0).map((bucket): any => {
        return (
          <ListItem
            button={true}
            component='div'
            dense
            key={bucket.key}
            onClick={(): void => handleChange(bucket.key)}
            role={undefined}
          >
            <ListItemText
              className={classes.content}
              primary={
                <div style={{margin: "0 20px 0 0", width: 120}}>
                  <Typography component="span">
                    {bucket.key}
                  </Typography>
                </div>
              }
              secondary={
                <Typography
                  className={classes.inline}
                  color="textPrimary"
                  component="span"
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
        expandIcon={<ExpandMore />}
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav">
          {aggregation && actions(aggregation)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

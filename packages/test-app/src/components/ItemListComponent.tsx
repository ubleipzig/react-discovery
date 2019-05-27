import React, {ReactElement} from "react"
import {connect} from "react-redux"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {setSelectedFilters, setStart, setSuggest} from "solr-react-faceted-search"

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

export interface IAggregation {
  buckets: IBucket[];
}

export interface IBucket extends IAggregation {
  key: string;
  docCount: number;
}

export interface IItemListProps extends IListProps {
  field: string;
  filters: string[];
  label: string;
  itemComponent?: any;
  setSelectedFilters: Function;
  setStart: Function;
  setSuggest: Function;
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

export const ItemListComponent: React.FC<any> = (props: IItemListProps): ReactElement => {
  const {aggregation, field, filters, label, setSelectedFilters, setStart, setSuggest} = props
  const classes: any = useStyles()
  const [isExpanded, setExpanded] = React.useState(false)

  const handleExpand = (panel): any => ({}, isExpanded): void => { // eslint-disable-line no-empty-pattern
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key): void => {
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== key) : []
    newFilters.push(key)
    setSuggest({suggest: false})
    setSelectedFilters({field, filters: newFilters})
    setStart({newStart: 0})
  }

  const actions = (aggregation): JSX.Element => {
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
        expandIcon={<ExpandMoreIcon />}
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

const mapDispatchToProps = {setSelectedFilters, setStart, setSuggest}

const mapStateToProps = (state, {field}): any => ({
  aggregation: state.response && state.response.aggregations && state.response.aggregations[field],
  filters: state.query.filters[field]
})

export const ItemList: any = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)

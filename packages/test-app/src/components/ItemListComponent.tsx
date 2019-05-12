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
import {setDisMaxQuery, setSelectedFilters, setStart} from "solr-react-faceted-search"

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
  setDisMaxQuery: Function;
  setSelectedFilters: Function;
  setStart: Function;
}

const useStyles = makeStyles((theme): any => ({
  content: {
    flex: '1 0 auto',
    padding: 0,
    display: 'flex'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  inline: {
    display: 'inline',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
}))

export const ItemListComponent: React.FC<any> = (props: IItemListProps): ReactElement => {
  const {aggregation, filters, label, setDisMaxQuery, setSelectedFilters, setStart} = props
  const classes: any = useStyles()
  const [isExpanded, setExpanded] = React.useState(false)

  const handleExpand = (panel): any => ({}, isExpanded): void => { // eslint-disable-line no-empty-pattern
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key): void => {
    filters && !filters.includes(key) && filters.push(key)
    setSelectedFilters({filters})
    const filterString = filters.join("+AND+")
    setDisMaxQuery({typeDef: "dismax", stringInput: encodeURI(`${filterString}`)})
    setStart({newStart: 0})
  }

  const actions = (aggregation): JSX.Element => {
    return aggregation.buckets.sort((a, b): any => (a.docCount < b.docCount) ? 1 : -1)
      .filter((bucket): any => bucket.docCount > 0).map((bucket): any => {
        return (
          <ListItem
            component={"div"}
            key={bucket.key}
            role={undefined}
            dense
            button={true}
            onClick={(): void => handleChange(bucket.key)}
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
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
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
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
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

ItemListComponent.defaultProps = {
  filters: [],
  showCount: true,
  multiselect: true,
  selectedItems: [],
}

const mapDispatchToProps = {setDisMaxQuery, setSelectedFilters, setStart}

const mapStateToProps = (state, {field}): any => ({
  aggregation: state.response && state.response.aggregations !== null && state.response.aggregations[field],
  filters: state.query && state.query.filters
})

export const ItemList: any = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)

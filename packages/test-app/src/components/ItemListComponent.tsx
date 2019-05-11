import * as React from "react"
import {ReactElement} from "react"
import {CheckboxItem} from './ItemComponent'
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
import {setDisMaxQuery, setStart} from "solr-react-faceted-search"

export interface ListProps {
  toggleItem: (key:string)=>void
  setItems: (keys:Array<string>)=>void
  aggregation: IAggregation
  countFormatter?:(count:number)=> string|number,
  selectedItems: Array<string>
  docCount?: number // number of documents for this list
  disabled?: boolean
  mod?: string
  className?: string
  showCount?: boolean
  translate?: (s: string) => string
  multiselect?: boolean // if true, uses toggleItem, else uses setItems
}

export interface IAggregation {
    buckets: IBucket[]
}

export interface IBucket extends IAggregation {
  key: string
  docCount: number
}

export interface ItemListProps extends ListProps {
  field: string
  label: string
  itemComponent?: any
  setDisMaxQuery: Function
  setStart: Function
}

const useStyles = makeStyles(theme => ({
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

export const ItemListComponent: React.FC<any> = (props: ItemListProps): ReactElement => {
  const {aggregation, label, setDisMaxQuery, setStart} = props
  const classes = useStyles()
  const [isExpanded, setExpanded] = React.useState(false)

  const handleExpand = panel => ({}, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleChange = (key) => {
    setDisMaxQuery({typeDef: "dismax", stringInput: encodeURI(`"${key}"`)})
    setStart({newStart: 0})
  }

  const actions = (aggregation) => {
    return aggregation.buckets.sort((a, b) => (a.docCount < b.docCount) ? 1 : -1)
      .filter((bucket) => bucket.docCount > 0).map((bucket) => {
      return (
        <ListItem
          component={"div"}
          key={bucket.key}
          role={undefined}
          dense
          button={true}
          onClick={() => handleChange(bucket.key)}
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
    <ExpansionPanel expanded={isExpanded} onChange={handleExpand(PANEL_ID)}>
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
  showCount: true,
  itemComponent: CheckboxItem,
  multiselect: true,
  selectedItems: [],
}

const mapDispatchToProps = {setDisMaxQuery, setStart}

const mapStateToProps = (state, {field}): any => ({
  aggregation: state.response && state.response.aggregations !== null && state.response.aggregations[field]
})

export const ItemList: any = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)

import * as React from "react"
import {ReactElement} from "react"
import {CheckboxItem} from './ItemComponent'
import {connect} from "react-redux"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
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
  itemComponent?: any
  setDisMaxQuery: Function
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
}));

const handleChange = () => {
  setDisMaxQuery({typeDef: "dismax", stringInput: ""})
}

export const ItemListComponent: React.FC<any> = (props: ItemListProps): ReactElement => {
  const {aggregation, setDisMaxQuery} = props
  const classes = useStyles();

  const isActive = (bucket): boolean => {
    const { selectedItems, multiselect } = props
      if (selectedItems.length === 0) return null
      return selectedItems[0] === bucket.key
  }

  const actions = (agg) => {
    return agg.buckets.sort((a, b) => (a.docCount < b.docCount) ? 1 : -1).map((bucket) => {
      return (
        <ListItem key={bucket.key} role={undefined} dense button={false} onClick={handleChange}>
          <ListItemText
            primary={bucket.key}
            secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {bucket.docCount}
              </Typography>
            </>
          }/>
        </ListItem>
      )
    })
  }

  return (
      <List component="ul" >
        {aggregation && actions(aggregation)}
      </List>
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
  aggregation: state.response.aggregations[field]
})

export const ItemList = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)

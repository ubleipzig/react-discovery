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
  content: {
    flex: '1 0 auto',
    padding: 0,
    display: 'flex'
  },
  inline: {
    display: 'inline',
  },
}));

export const ItemListComponent: React.FC<any> = (props: ItemListProps): ReactElement => {
  const {aggregation, setDisMaxQuery} = props
  const classes = useStyles();

  const handleChange = (key) => {
    setDisMaxQuery({typeDef: "dismax", stringInput: encodeURI(`"${key}"`)})
  }

  const actions = (agg) => {
    return agg.buckets.sort((a, b) => (a.docCount < b.docCount) ? 1 : -1).map((bucket) => {
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

  return (
      <List component="nav">
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
  aggregation: state.response && state.response.aggregations !== null && state.response.aggregations[field]
})

export const ItemList: any = connect(mapStateToProps, mapDispatchToProps)(ItemListComponent)

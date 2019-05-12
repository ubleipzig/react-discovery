import React, {ReactElement} from "react"
import {connect} from "react-redux"
import {setDisMaxQuery, setSelectedFilters, setStart} from "solr-react-faceted-search"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { makeStyles } from '@material-ui/core/styles'

interface IGroupSelectedFilters {
  filters: string[];
  setDisMaxQuery: Function;
  setSelectedFilters: Function;
  setStart: Function;
}

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 20,
  },
}))


const GroupSelectedFiltersComponent: React.FC<any> = (props: IGroupSelectedFilters): ReactElement => {
  const {filters, setDisMaxQuery, setSelectedFilters, setStart} = props
  const classes: any = useStyles()

  const onClose = (filter) => {
    const newFilters = filters.filter((f) => f !== filter)
    setSelectedFilters({filters: newFilters})
    const filterString = newFilters.join("+AND+")
    setDisMaxQuery({typeDef: "dismax", stringInput: encodeURI(`${filterString}`)})
    setStart({newStart: 0})
  }

  const buildFilters = (filters): ReactElement => {
    return filters && filters.map((filter, key): ReactElement =>
      <ListItem
        button
        component='div'
        dense key={key}>
        <ListItemText primary={filter}/>
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => onClose(filter)}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      </ListItem>)
  }

  return (
    <List style={{display: 'flex'}} component="nav">
      {buildFilters(filters)}
    </List>
  )
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters
})

const mapDispatchToProps = {setDisMaxQuery, setSelectedFilters, setStart}

export const GroupSelectedFilters = connect(mapStateToProps, mapDispatchToProps)(GroupSelectedFiltersComponent)

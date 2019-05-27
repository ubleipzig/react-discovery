import React, {ReactElement} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {connect} from "react-redux"
import {setSelectedFilters, setStart, setSuggest} from "solr-react-faceted-search"

interface ITabsComponent {
  docTypes: string[];
  filters: string[];
  setSelectedFilters: Function;
  setStart: Function;
  setSuggest: Function;
}
const useStyles = makeStyles((theme: Theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}))

const TabsComponent: React.FC<any> = (props: ITabsComponent): ReactElement => {
  const classes: any = useStyles()
  const {docTypes, filters, setSelectedFilters, setStart, setSuggest} = props
  const [value, setValue] = React.useState(0)

  const TYPE_FIELD = 'type_s'

  const handleChange = ({}: React.ChangeEvent<{}>, newValue: number): void => {
    const typeString = docTypes[newValue]
    const newFilters = filters && filters.length ? filters.filter((f): any => f !== typeString) : []
    newFilters.push(typeString)
    setSuggest({suggest: false})
    setSelectedFilters({field: TYPE_FIELD, filters: newFilters})
    setStart({newStart: 0})
    setValue(newValue)
  }
  const buildTabs = (): ReactElement[] => {
    return docTypes.map((ft, i): ReactElement => <Tab href='' key={i} label={ft} />)
  }

  return docTypes ? (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Tabs
          centered
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          {buildTabs()}
        </Tabs>
      </AppBar>
    </div>
  ) : null
}

const mapStateToProps = (state): any => ({
  docTypes: state.config.collections[state.config.currentCollection].docTypes,
  filters: state.query.filters
})

const mapDispatchToProps = {setSelectedFilters, setStart, setSuggest}

export const TabsAppBar: any = connect(mapStateToProps, mapDispatchToProps)(TabsComponent)

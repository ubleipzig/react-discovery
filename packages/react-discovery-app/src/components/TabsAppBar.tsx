import {AppBar, Tab, Tabs, Theme, makeStyles, } from '@material-ui/core'
import React, {ReactElement} from 'react'
import {
  getDocTypes,
  getStringInput,
  setIsViewExpanded,
  setSelectedFilters,
  setStart,
  setSuggest
} from "@react-discovery/solr"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme: Theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export const TabsAppBar: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const docTypes = getDocTypes()
  const stringInput = getStringInput()
  const [value, setValue] = React.useState(0)

  const TYPE_FIELD = 'type_s'

  const handleChange = ({}: React.ChangeEvent<{}>, newValue: number): void => {
    const typeString = docTypes[newValue]
    const newFilters = Array.of(typeString)
    dispatch(setSuggest({stringInput, suggest: false}))
    dispatch(setSelectedFilters({field: TYPE_FIELD, filters: newFilters}))
    dispatch(setIsViewExpanded({isViewExpanded: false}))
    dispatch(setStart({newStart: 0}))
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


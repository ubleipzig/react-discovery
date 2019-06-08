import {AppBar, Tab, Tabs, Theme, makeStyles, } from '@material-ui/core'
import React, {ReactElement, useEffect} from 'react'
import {
  getDocTypes, getFilters,
  getStringInput,
  setIsViewExpanded,
  setSelectedFilters,
  setStart,
  setSuggest, usePrevious
} from "@react-discovery/solr"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

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
  const filters = getFilters()
  const prevFilters = usePrevious(filters)
  const {t} = useTranslation('vocab')
  const [value, setValue] = React.useState(0)

  const TYPE_FIELD = 'type_s'

  useEffect((): void => {
    const [typeFilter] = filters['type_s']
    if (prevFilters !== filters && typeFilter !== docTypes[value].key) {
      setValue(0)
    }
  })

  const handleChange = ({}: React.ChangeEvent<{}>, newValue: number): void => {
    const typeObject = docTypes[newValue]
    const newFilters = typeObject.key ? Array.of(typeObject.key) : []
    dispatch(setSuggest({stringInput, suggest: false}))
    dispatch(setSelectedFilters({field: TYPE_FIELD, filters: newFilters}))
    dispatch(setIsViewExpanded({isViewExpanded: false}))
    dispatch(setStart({start: 0}))
    setValue(newValue)
  }

  const buildTabs = (): ReactElement[] => {
    return docTypes.map((ft, i): ReactElement =>
      <Tab data-testid={`tab-${i}`} href='' key={i} label={t(ft.label)} />)
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


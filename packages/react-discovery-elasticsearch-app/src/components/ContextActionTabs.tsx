import {AppBar, Tab, Tabs, Theme, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {useTranslation} from "react-i18next"

export const useTabsAppBarStyles = makeStyles((theme: Theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export const ContextActionTabs: React.FC<any> = (props): ReactElement => {
  const classes: any = props.classes || useTabsAppBarStyles({})
  const [value, setValue] = React.useState(0)
  const {t} = useTranslation('vocab')
  const actionTypes = [
    {
      key: "search",
      label: "search"
    },
    {
      key: "browse",
      label: "browse"
    },
    {
      key: "advancedSearch",
      label: "advanced search"
    }
  ]
  const handleChange = ({}: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue)
  }
  const buildTabs = (): ReactElement[] => {
    return actionTypes.map((ft, i): ReactElement =>
      <Tab
        data-testid={`tab-${i}`}
        href=''
        key={i}
        label={t(ft.label)}
      />)
  }

  return actionTypes ? (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Tabs
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={value}
          variant="scrollable">
          {buildTabs()}
        </Tabs>
      </AppBar>
    </div>
  ) : null
}

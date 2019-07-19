import React, {ReactElement} from "react"
import {Tab, Tabs} from "@material-ui/core"
import {useTranslation} from "react-i18next"


export const ContextActionTabs: React.FC<any> = (): ReactElement => {
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
      label: "advancedSearch"
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
    <Tabs
      indicatorColor="primary"
      onChange={handleChange}
      scrollButtons="auto"
      textColor="primary"
      value={value}
      variant="scrollable">
      {buildTabs()}
    </Tabs>
  ) : null
}

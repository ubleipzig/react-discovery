import {GridOn, UnfoldLess, UnfoldMore} from '@material-ui/icons'
import React, {ReactElement} from "react"
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {getViewType, setViewType} from "@react-discovery/configuration"
import {Tooltip} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const dispatch = useDispatch()
  const viewType = getViewType() || 'compact'
  const {t} = useTranslation()

  const handleChange = ({}, viewType): void => {
    dispatch(setViewType({viewType}))
  }

  return (
    <ToggleButtonGroup value={viewType} exclusive onChange={handleChange}>
      <ToggleButton value="compact">
        <Tooltip title={t('unfoldLess')}>
          <UnfoldLess/>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="expanded">
        <Tooltip title={t('unfoldMore')}>
          <UnfoldMore/>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="grid">
        <Tooltip title={t('grid')}>
          <GridOn/>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}


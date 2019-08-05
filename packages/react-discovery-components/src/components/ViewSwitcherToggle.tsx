import {Tooltip, makeStyles} from "@material-ui/core"
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import React, {ReactElement} from "react"
import {GridOn, UnfoldLess, UnfoldMore} from '@material-ui/icons'
import {getViewType, setViewType} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    height: 56,
    padding: '0 24px',
    position: 'relative',
    width: '100%'
  }
}))

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


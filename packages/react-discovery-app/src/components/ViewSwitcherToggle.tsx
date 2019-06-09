import {FormControl, FormControlLabel, Switch, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getIsViewExpanded, setIsViewExpanded} from "@react-discovery/solr"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme): any => ({
  formControl: {
    justifyContent: 'center',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const ViewSwitcherToggle: React.FC<any> = (): ReactElement => {
  const {t} = useTranslation()
  const classes: any = useStyles({});
  const dispatch = useDispatch()
  const isViewExpanded = getIsViewExpanded()

  const handleChange = (isViewExpanded): void => {
    dispatch(setIsViewExpanded({isViewExpanded}))
  }

  return (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <FormControlLabel
        control={
          <Switch
            checked={isViewExpanded}
            color="primary"
            data-testid='view-switcher-toggle'
            onChange={(): void => handleChange(!isViewExpanded)}
            value="checkedB"
          />
        }
        label={t('expandView')}
      />
    </FormControl>
  )
}


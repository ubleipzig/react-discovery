import React, {ReactElement} from "react"
import {useDispatch, useSelector} from "react-redux"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {makeStyles} from "@material-ui/core"
import {setIsViewExpanded} from "@react-discovery/solr"
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
  const classes: any = useStyles();
  const dispatch = useDispatch()
  const isViewExpanded = useSelector((state: any): boolean => state.config.isViewExpanded)

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
            onChange={(): void => handleChange(!isViewExpanded)}
            value="checkedB"
          />
        }
        label={t('expandView')}
      />
    </FormControl>
  )
}


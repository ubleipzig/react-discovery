import React, {ReactElement} from "react"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {connect} from "react-redux"
import {makeStyles} from "@material-ui/core"
import {setIsViewExpanded} from "@react-discovery/solr"

interface IViewSwitcher {
  currentHitComponent: string;
  hitComponents: any;
  isViewExpanded: boolean;
  setHitComponent: Function;
  setIsViewExpanded: Function;
}

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

export const ViewSwitcherToggleComponent: React.FC<any> = (props: IViewSwitcher): ReactElement => {
  const classes: any = useStyles();
  const {isViewExpanded, setIsViewExpanded} = props

  const handleChange = (isViewExpanded): void => {
    setIsViewExpanded({isViewExpanded})
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
        label="Expand View"
      />
    </FormControl>
  )
}

const mapStateToProps = (state): any => ({
  isViewExpanded: state.config.isViewExpanded,
})

const mapDispatchToProps = {setIsViewExpanded}

export const ViewSwitcherToggle: any = connect(mapStateToProps, mapDispatchToProps)(ViewSwitcherToggleComponent)

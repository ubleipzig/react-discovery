import React, {ReactElement, useEffect} from "react"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from "@material-ui/core/NativeSelect"
import Input from "@material-ui/core/Input"
import {setHitComponent} from "solr-react-faceted-search"
import {connect} from "react-redux"
import {makeStyles} from "@material-ui/core"

interface IViewSwitcher {
  currentHitComponent: string;
  hitComponents: any;
  setHitComponent: Function;
}

const useStyles = makeStyles((theme): any => ({
  formControl: {
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

export const ViewSwitcherComponent: React.FC<any> = (props: IViewSwitcher): ReactElement => {
  const classes: any = useStyles();
  const {currentHitComponent, hitComponents, setHitComponent} = props
  const defaultHitComponent = hitComponents.filter((hc): boolean => hc.defaultOption === true)[0].hitComponent

  useEffect((): void => {
    if (!currentHitComponent) {
      setHitComponent({currentHitComponent: defaultHitComponent})
    }
  })

  const handleChange = (e): void => {
    setHitComponent({currentHitComponent: e.target.value})
  }

  const buildOptions = (): ReactElement[] => {
    return hitComponents.filter((hc): boolean => hc.key !== 'facet')
      .map((hc, i): ReactElement => <option key={i} value={hc.hitComponent}>{hc.title}</option>)
  }

  return hitComponents ? (
    <FormControl
      className={classes.formControl}
      component='div'
    >
      <InputLabel>Set View Type</InputLabel>
      <NativeSelect
        input={<Input id="sort-native-simple" name="itemView" />}
        onChange={handleChange}
        value={currentHitComponent}
      >
        {buildOptions()}
      </NativeSelect>
    </FormControl>
  ) : null
}

const mapStateToProps = (state): any => ({
  currentHitComponent: state.config.currentHitComponent,
  hitComponents: state.config.collections[state.config.currentCollection].hitComponents,
})

const mapDispatchToProps = {setHitComponent}

export const ViewSwitcherToggle: any = connect(mapStateToProps, mapDispatchToProps)(ViewSwitcherComponent)

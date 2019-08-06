import {Button, makeStyles, withStyles} from "@material-ui/core"
import {ESCore, usePrevious} from "@react-discovery/core"
import {
  GroupSelectedFilters,
  IOverridableStyledComponent,
  ItemListFlat,
  SortingListFlat
} from "@react-discovery/components"
import React, {ReactElement, useEffect} from "react"
import {getCollectionByKey, getCurrentCollection, getRefinementListFilters} from "@react-discovery/configuration"
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import {Tune} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import uuid from 'uuid'

const ExpansionPanel = withStyles({
  expanded: {},
  root: {
    '&$expanded': {
      margin: 'auto',
    },
    '&:before': {
      display: 'none',
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    backgroundColor: '#fafafa',
    border: 'none',
    boxShadow: 'none',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
  root: {
    '&$expanded': {
      minHeight: 56
    },
    backgroundColor: '#fafafa',
    borderBottom: 'none',
    marginBottom: -1,
    minHeight: 56,
  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme): any => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails)

const useStyles = makeStyles((theme): any => ({
  button: {
    margin: theme.spacing(1),
  },
  content: {
    display: 'flex',
    flex: '1 0 auto',
    maxWidth: 200,
    paddingRight: 36,
  },
  grow: {
    flexGrow: 1
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  inline: {
    display: 'inline',
    paddingLeft: 16,
    textAlign: 'right'
  },
  leftIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
}))

export const ListFilters: React.FC<IOverridableStyledComponent> = (): ReactElement => {
  const classes: any = useStyles({})
  const currentCollection = getCurrentCollection()
  const collectionObj = getCollectionByKey(currentCollection)
  const refinementListFilters = getRefinementListFilters()
  const prevRefinementListFilters = usePrevious(refinementListFilters)
  const {t} = useTranslation(['common', 'vocab'])
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (): void => {
    setExpanded(!expanded);
  }

  useEffect((): void => {
    if (prevRefinementListFilters !== refinementListFilters) {
      const {refinementListFilters} = collectionObj
      const aggs = ESCore.builders.buildAggs(refinementListFilters)
      dispatch(ESCore.state.setAggs({aggs}))
    }
  }, [prevRefinementListFilters, refinementListFilters])

  const buildRefinementListFilters = (): ReactElement[] => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemListFlat
        classes={classes}
        field={refinementListFilters[id].field}
        id={id}
        key={uuid()}
        label={t(`vocab:${refinementListFilters[id].label}`)}
        size={refinementListFilters[id].size}
      />))
  }

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={handleChange}
      square
    >
      <ExpansionPanelSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Button
          className={classes.button}
          color="primary"
          href=''
          variant="outlined"
        >
          Filter
          <Tune className={classes.leftIcon} />
        </Button>
        <GroupSelectedFilters/>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {buildRefinementListFilters()}
        <SortingListFlat/>
      </ExpansionPanelDetails>
    </ExpansionPanel>)
}

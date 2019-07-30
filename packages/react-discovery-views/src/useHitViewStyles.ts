import {makeStyles} from "@material-ui/core"

export const useHitViewStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flex: '1 0 auto',
    padding: 0,
  },
  contentNoFlex: {
    padding: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expanded: {
    maxHeight: 32,
    minHeight: 0
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expansionSummaryRoot: {
    '&$expanded': {
      maxHeight: 32,
      minHeight: 0
    },
    backgroundColor: '#eae7e7',
    maxHeight: 32,
    minHeight: 0,
  },
  inline: {
    display: 'inline',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: '5px',
  },
}))

import {makeStyles} from "@material-ui/core"

export const useHitViewStyles = makeStyles((theme): any => ({
  content: {
    display: 'flex',
    flex: '1 0 auto',
    padding: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  inline: {
    display: 'inline',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex-root',
    marginBottom: '5px',
  },
}))

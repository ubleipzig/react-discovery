import 'firebase/database'
import {IconButton, Snackbar, Tooltip, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {IOverridableStyledComponent} from "@react-discovery/components"
import {Close, Save} from "@material-ui/icons"
import {getWorkspaceState} from "@react-discovery/workspace"
import {useFirebaseAuth} from '@use-firebase/auth'
import {useTranslation} from "react-i18next"
import {useValue} from '../hooks'

const useStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const SaveWorkspaceButton: React.FC<IOverridableStyledComponent> = (props): ReactElement => {
  const classes: any = props.classes || useStyles({})
  const {user} = useFirebaseAuth()
  const uid = (user && user.uid) || null
  const [value, setValue] = useValue('users/' + uid + '/workspaces', undefined, undefined) as any
  const workspaceState = getWorkspaceState()
  const base64State = window.btoa(JSON.stringify(workspaceState))
  const [open, setOpen] = React.useState(false);

  const handleChange = (): void => {
    setOpen(true)
    setValue({[Date.now()]: base64State})
  }
  const {t} = useTranslation('common')

  const handleClose = (): void => {
    setOpen(false);
  }

  return (
    <>
      <Tooltip
        title={t('saveWorkspace')}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          data-testid='save'
          href=''
          onClick={handleChange}
        >
          <Save/>
        </IconButton>
      </Tooltip>
      <Snackbar
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[
          <IconButton
            aria-label="close"
            className={classes.close}
            color="inherit"
            key="close"
            onClick={handleClose}
          >
            <Close />
          </IconButton>,
        ]}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        autoHideDuration={6000}
        message={<span id="message-id">Workspace Saved</span>}
        onClose={handleClose}
        open={open}
      />
    </>
  )
}

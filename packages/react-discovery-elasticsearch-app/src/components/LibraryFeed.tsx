import {Close, Link, PictureInPicture} from '@material-ui/icons'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import React, {ReactElement} from "react"
import {NavLink} from "react-navi"
import {useClipboard} from 'use-clipboard-copy'
import {useFirebaseAuth} from '@use-firebase/auth'
import {useTranslation} from "react-i18next"
import {useValue} from "../hooks"

const useStyles = makeStyles((theme): any => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    width: '50%',
  },
  table: {
    minWidth: 650,
  },
}));

export const LibraryFeed: React.FC<any> = (): ReactElement => {
  const {user} = useFirebaseAuth()
  const uid = (user && user.uid) || null
  const [value, setValue] = useValue('users/' + uid + '/workspaces', undefined, undefined) as any
  const classes: any = useStyles({})
  const clipboard = useClipboard({copiedTimeout: 600})
  const {t} = useTranslation('common')
  const dtOptions = {
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    month: 'numeric',
    second: 'numeric',
    year: 'numeric'
  }

  const handleRemoveWorkspace = (value): void => {
    setValue({[value]: null})
  }

  const buildSavedWorkspaces = (): ReactElement[] => {
    if (value !== null) {
      return Object.entries(value).map(([k, v]) => {
        const date = new Date(parseInt(k))
        const formattedDate = new Intl.DateTimeFormat('default', dtOptions).format(date)
        const baseUrl = window.location.protocol + "//" + window.location.host;
        const url = `${baseUrl}/workspace?state=${v}`
        const navLink = `/workspace?state=${v}`
        return (
          <TableRow key={k}>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
              <IconButton><NavLink href={navLink}><PictureInPicture/></NavLink></IconButton>
            </TableCell>
            <TableCell>
              <Tooltip
                title={clipboard.copied ? t('copied') : t('copyLink')}>
                <IconButton onClick={(): void => clipboard.copy(url)}><Link/></IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <IconButton onClick={(): void => handleRemoveWorkspace(k)}><Close/></IconButton>
            </TableCell>
          </TableRow>
        )
      })
    }
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date Created</TableCell>
            <TableCell>Workspace</TableCell>
            <TableCell>Copy Link</TableCell>
            <TableCell>Delete Workspace</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildSavedWorkspaces()}
        </TableBody>
      </Table>
    </Paper>
  )
}

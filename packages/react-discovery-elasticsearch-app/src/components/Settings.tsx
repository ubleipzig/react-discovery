import {CollectionSelector, SizeSelector} from '.'
import {FormatLineSpacing, Search} from "@material-ui/icons"
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {useTranslation} from "react-i18next"

const useStyles = makeStyles((theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 640,
    minWidth: 400,
  },
  sliderRoot: {
    width: 300,
  },
}))

export const Settings: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const {t} = useTranslation(['common'])

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary={t('setCollection')} />
          <CollectionSelector/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FormatLineSpacing />
          </ListItemIcon>
          <ListItemText primary={t('setSize')} />
          <div className={classes.sliderRoot}>
            <SizeSelector/>
          </div>
        </ListItem>
      </List>
    </div>
  )
}

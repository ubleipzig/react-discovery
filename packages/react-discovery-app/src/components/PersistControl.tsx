import React, {ReactElement} from "react"
import {getIsPersisted, setIsPersisted} from "@react-discovery/solr"
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import Save from '@material-ui/icons/Save'
import {useDispatch} from "react-redux"

export const PersistControl: React.FC<any> = (): ReactElement => {
  const dispatch = useDispatch()
  const isPersisted = getIsPersisted()

  const handlePersist = (): void => {
    dispatch(setIsPersisted({isPersisted: !isPersisted}))
  }

  const buildPersistIcon = (): ReactElement => {
    return (
      <IconButton
        color="inherit"
        href=''
        onClick={handlePersist}
      >{isPersisted ? (
          <Badge
            color="primary"
            variant="dot"
          >
            <Save />
          </Badge>) :
          (<Badge
            color="secondary"
            variant="dot"
          >
            <Save />
          </Badge>)}
      </IconButton>
    )
  }

  return (
    buildPersistIcon()
  )
}

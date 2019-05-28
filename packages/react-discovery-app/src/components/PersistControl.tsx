import React, {ReactElement} from "react"
import {useDispatch, useSelector} from "react-redux"
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import Save from '@material-ui/icons/Save'
import {setIsPersisted} from "@react-discovery/solr"

export const PersistControl: React.FC<any> = (): ReactElement => {
  const dispatch = useDispatch()
  const isPersisted = useSelector((state: any): boolean => state.config.isPersisted)

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

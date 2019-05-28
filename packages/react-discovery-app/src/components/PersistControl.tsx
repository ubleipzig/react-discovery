import React, {ReactElement} from "react"
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import Save from '@material-ui/icons/Save'
import {connect} from "react-redux"
import {setIsPersisted} from "@react-discovery/solr"

interface IPersistControl {
  isPersisted: boolean;
  setIsPersisted: Function;
}
export const PersistControlComponent: React.FC<any> = (props: IPersistControl): ReactElement => {
  const {isPersisted, setIsPersisted} = props

  const handlePersist = (): void => {
    setIsPersisted({isPersisted: !isPersisted})
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

const mapStateToProps = (state): any => ({
  isPersisted: state.config.isPersisted
})

const mapDispatchToProps = {setIsPersisted}

export const PersistControl = connect(mapStateToProps, mapDispatchToProps)(PersistControlComponent)

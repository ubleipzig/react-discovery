import React, {ReactElement} from "react"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Save from '@material-ui/icons/Save'
import {setIsPersisted} from "solr-react-faceted-search"
import {connect} from "react-redux"

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

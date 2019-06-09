import {IconButton, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {setQueryInput, setStart, setTypeDef} from "@react-discovery/solr"
import {Redo} from "@material-ui/icons"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const ResetButton: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()

  const handleChange = (): void => {
    dispatch(setQueryInput({stringInput: ''}))
    dispatch(setStart({start: 0}))
    dispatch(setTypeDef({typeDef: 'edismax'}))
  }

  return (
    <IconButton
      className={classes.menuButton}
      color="inherit"
      data-testid='reset'
      href=''
      onClick={handleChange}
    >
      <Redo/>
    </IconButton>
  )
}

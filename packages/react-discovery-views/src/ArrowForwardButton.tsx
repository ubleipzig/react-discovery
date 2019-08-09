import {Fab, Theme, createStyles, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {ArrowForward} from "@material-ui/icons"
import {ESCore} from "@react-discovery/core"
import {buildDocumentUri} from "./utils"
import {getCurrentCollection} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useNavigation} from "react-navi"

interface IArrowBackButton {
  collection: string;
  hitIndex: number;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    nextItem: {
      margin: theme.spacing(1),
      position: 'absolute',
      right: 24,
      top: 'calc(30vh + 93px)'
    },
  }),
)

export const ArrowForwardButton: React.FC<IArrowBackButton> = (props): ReactElement => {
  const {collection, hitIndex} = props
  const classes: any = useStyles({})
  const currentCollection = getCurrentCollection()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const numFound = ESCore.state.getNumFound()
  const size = ESCore.state.getSize()
  const indexConstraint = Math.min(numFound, size) - 1
  const nextIndex = hitIndex + 1 <= indexConstraint ? hitIndex + 1 : indexConstraint
  const nextHit = ESCore.state.getHitForIndex(nextIndex)
  const nextHitId = nextHit && nextHit.id

  const handleGetNextDoc = (): void => {
    const url = buildDocumentUri(collection, nextHitId)
    dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    navigation.navigate(`/detail/${currentCollection}/${nextHitId}`)
  }

  return (
    <Fab
      aria-label="next"
      classes={{root: classes.nextItem}}
      href=''
      onClick={handleGetNextDoc}
    >
      <ArrowForward/>
    </Fab>
  )
}

import {CheckCircle, CheckCircleOutline} from "@material-ui/icons"
import {IHit, usePrevious} from "@react-discovery/core"
import {IconButton, Tooltip, makeStyles, withStyles} from "@material-ui/core"
import React, {ReactElement, useEffect} from "react"
import {Domain} from "./enum"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import {getCurrentCollection} from "@react-discovery/configuration"

interface IAddToWorkspaceButton {
  actions: any;
  classes?: any;
  hit: IHit;
  item: any;
}

const useStyles = makeStyles((theme): any => ({
  title: {
    color: theme.palette.common.white,
  },
}))

const HoverButton = withStyles(() => ({
  root: {
    "&:hover": {
      opacity: 1
    },
    color: 'white',
    opacity: 0
  },
}))(IconButton)

export const AddToWorkspaceButton: React.FC<IAddToWorkspaceButton> = (props): ReactElement => {
  const {getWorkspaceViewIdMap, setViewIdMap} = props.actions
  const collection = getCurrentCollection()
  const classes: any = props.classes || useStyles({})
  const {hit, item} = props
  const id = hit && (hit._source.id || hit.id)
  const dispatch = useDispatch()
  const viewIdMap = getWorkspaceViewIdMap()
  const prevViewIdMap = usePrevious(viewIdMap)
  const {t} = useTranslation()
  const [currentManifestNodes, setManifestNodes] = React.useState([])
  const nodeCount = currentManifestNodes.filter((node): boolean => node === item[Domain.MANIFEST_ID_FIELD])

  useEffect((): void => {
    if (prevViewIdMap !== viewIdMap) {
      const manifestsInMap = Object.values(viewIdMap).map((instance: any) => instance.manifest)
      setManifestNodes([...manifestsInMap])
    }
  }, [prevViewIdMap, viewIdMap])

  const handleAddToWorkspace = (manifest): void => {
    dispatch(setViewIdMap({collection, id, manifest, type: 'image'}))
  }

  return (
    <Tooltip
      title={t('addMediaToWorkspace')}>
      {nodeCount && nodeCount.length ?
        <IconButton
          aria-label={`star ${item[Domain.MEDIA_TITLE_FIELD]}`}
          color='primary'
          href=''
          onClick={(): void => handleAddToWorkspace(item[Domain.MANIFEST_ID_FIELD])}
        >
          <CheckCircle className={classes.title}/>
        </IconButton> :
        <HoverButton
          aria-label={`star ${item[Domain.MEDIA_TITLE_FIELD]}`}
          onClick={(): void => handleAddToWorkspace(item[Domain.MANIFEST_ID_FIELD])}
        >
          <CheckCircleOutline className={classes.title}/>
        </HoverButton>
      }
    </Tooltip>
  )
}

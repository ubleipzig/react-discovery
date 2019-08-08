import {CheckCircle, CheckCircleOutline} from "@material-ui/icons"
import {GridListTileBar, IconButton, Tooltip, makeStyles, withStyles} from "@material-ui/core"
import {IHit, usePrevious} from "@react-discovery/core"
import React, {ReactElement, useEffect} from "react"
import {getWorkspaceViewIdMap, setViewIdMap} from "@react-discovery/workspace"
import {Domain} from "@react-discovery/views"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

interface IImageGridListTitleBar {
  classes?: any;
  hit: IHit;
  item: any;
}

const useStyles = makeStyles((theme): any => ({
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, #00102d 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

export const ImageGridListTitleBar: React.FC<IImageGridListTitleBar> = (props): ReactElement => {
  const classes: any = props.classes || useStyles({})
  const {hit, item} = props
  const id = hit && (hit._source.id || hit.id)
  const dispatch = useDispatch()
  const viewIdMap = getWorkspaceViewIdMap()
  const prevViewIdMap = usePrevious(viewIdMap)
  const {t} = useTranslation()
  const [currentManifestNodes, setManifestNodes] = React.useState([])

  useEffect((): void => {
    if (prevViewIdMap !== viewIdMap) {
      const manifestsInMap = Object.values(viewIdMap).map((instance: any) => instance.manifest)
      setManifestNodes([...manifestsInMap])
    }
  }, [prevViewIdMap, viewIdMap])

  const handleAddToWorkspace = (manifest): void => {
    dispatch(setViewIdMap({id, manifest, type: 'image'}))
  }

  const buildGridListTitleBar = (item): ReactElement => {
    const nodeCount = currentManifestNodes.filter((node): boolean => node === item[Domain.MANIFEST_ID_FIELD])
    return (
      <GridListTileBar
        actionIcon={
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
        }
        actionPosition="right"
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        title={item[Domain.MEDIA_TITLE_FIELD]}
        titlePosition='top'
      />
    )
  }

  return (<>{buildGridListTitleBar(item)}</>)
}

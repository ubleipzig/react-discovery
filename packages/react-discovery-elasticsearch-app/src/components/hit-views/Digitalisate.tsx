import {GridListTile, GridListTileBar, IconButton, makeStyles, Tooltip} from "@material-ui/core"
import React, {ReactElement, useEffect} from "react"
import {Star, StarBorder} from '@material-ui/icons'
import {getWorkspaceViewIdMap, setViewIdMap} from "@react-discovery/workspace"
import {Domain} from "@react-discovery/views"
import {ESCore, usePrevious} from "@react-discovery/core"
import {Thumbnail} from "@react-discovery/iiif"
import {useDispatch} from "react-redux"
import {useThumbnailStyles} from "."
import {useTranslation} from "react-i18next"

const useStyles = makeStyles(theme => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

export const Digitalisate: React.FC<any> = (props): ReactElement => {
  const classes = useStyles({})
  const thumbnailClasses = useThumbnailStyles({})
  const {hit} = props
  const id = hit && hit._source.id
  const media = hit && hit._source && hit._source.entities
    .filter((entity) => entity[typeField] === Domain.DIGITALISAT)
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

  const buildInWorkspaceIcon = (item) => {
    const nodeCount = currentManifestNodes.filter((node) => node === item[Domain.MANIFEST_ID_FIELD])
    return nodeCount.length
      ? <Star className={classes.title}/>
      : <StarBorder className={classes.title}/>
  }

  const buildMediaGridList = (): ReactElement[] => {
    return media.map((item, i) => (
      <GridListTile
        key={i}
        style={{listStyle: 'none'}}
      >
        <Thumbnail
          classes={thumbnailClasses}
          manifest={item[Domain.MANIFEST_ID_FIELD]}/>
        <GridListTileBar
          actionIcon={
            <Tooltip
              title={t('addMediaToWorkspace')}>
              <IconButton
                aria-label={`star ${item[Domain.MEDIA_TITLE_FIELD]}`}
                onClick={() => handleAddToWorkspace(item[Domain.MANIFEST_ID_FIELD])}
              >
                {buildInWorkspaceIcon(item)}
              </IconButton>
            </Tooltip>
          }
          actionPosition="left"
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          title={item[Domain.MEDIA_TITLE_FIELD]}
          titlePosition="top"
        />
      </GridListTile>
    ))
  }

  return (
    <div className={classes.root}>
      {buildMediaGridList()}
    </div>
  )
}

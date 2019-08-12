import {CheckCircle, CheckCircleOutline} from "@material-ui/icons"
import {GridListTile, IconButton, Tooltip, Typography, makeStyles, withStyles} from "@material-ui/core"
import {IHit, usePrevious} from "@react-discovery/core"
import {InnerHtmlValue, buildHighlightedValueForHit, getFirstManifestFromHit} from '@react-discovery/components'
import React, {ReactElement, useEffect} from "react"
import {getWorkspaceViewIdMap, setViewIdMap} from "@react-discovery/workspace"
import {Domain} from "@react-discovery/views"
import {Thumbnail} from "@react-discovery/iiif"
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

interface IGridComponent {
  hit: IHit;
}

const useStyles = makeStyles((theme): any => ({
  cover: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    maxHeight: 'fit-content',
    padding: 12,
  },
  coverBorder: {
    backgroundColor: '#e8f0fe',
    border: '1px solid',
    borderColor: '#4285f4',
    borderRadius: 6,
  },
  gridListTile: {
    background: '#FFF',
    boxShadow: '0 2px 4px rgba(0,0,0,.1)',
    listStyle: 'none',
    margin: 5,
    maxWidth: 200,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  media: {
    borderRadius: 8,
    maxWidth: 180,
    objectFit: 'cover',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.text.primary,
  },
  titleBar: {
    background: 'whitesmoke',
  },
  values: {
    '& em': {
      background: '#cfe1f3'
    },
    padding: 10
  }
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

const GridComponent: React.FC<IGridComponent> = (props: IGridComponent): ReactElement => {
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const {hit} = props
  const id = hit && (hit._source.id || hit.id)
  const title = buildHighlightedValueForHit('title', hit) || buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit)
  const manifest = hit && (getFirstManifestFromHit(hit, Domain.DIGITALISAT) || hit._source.manifest || hit._source.Manifest)
  const item = {
    [Domain.MEDIA_TITLE_FIELD]: title,
    [Domain.MANIFEST_ID_FIELD]: manifest,
  }
  const thumbnail = hit && hit._source && hit._source.thumbnail
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
    dispatch(setViewIdMap({id, manifest, type: 'image'}))
  }

  return (
    <GridListTile
      className={classes.gridListTile}
    >
      <div style={{display: 'flex', left: 0, position: 'absolute', right: 0, zIndex: 500}}>
        <div style={{flexGrow: 1}}/>
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
      </div>
      <Thumbnail
        classes={classes}
        id={id}
        manifest={manifest}
        thumbnail={thumbnail}
      />
      <Typography
        color='textSecondary'
        variant='subtitle2'>
        <InnerHtmlValue classes={classes} value={item[Domain.MEDIA_TITLE_FIELD]}/>
      </Typography>
    </GridListTile>
  )
}

export default GridComponent

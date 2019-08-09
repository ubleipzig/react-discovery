import {ArrowBack, ArrowForward} from '@material-ui/icons'
import {Card, CardActions, CardContent, Divider, Fab, Grid, Theme, createStyles, makeStyles} from "@material-ui/core"
import {
  Domain, EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  buildDocumentUri,
  digitalisatDisplayFields,
  facetDisplayFields, personDisplayFields,
} from "."
import {
  FieldValueDisplay,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit, getFirstManifestFromHit,
} from "@react-discovery/components"
import React, {ReactElement, useEffect} from "react"
import {ESCore} from "@react-discovery/core"
import {SimpleImageViewer} from "@react-discovery/iiif"
import {getCurrentCollection} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useNavigation} from "react-navi"
import uuid from 'uuid'

interface IDetailView {
  collection: string;
  id: string;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    cardContent: {
      display: 'flex',
      flex: '1 0 auto',
      padding: 0,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    gridActions: {
      alignItems: 'center',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    main: {
      backgroundColor: 'lightgray',
      display: 'flex',
      padding: 20
    },
    nextItem: {
      margin: theme.spacing(1),
      position: 'absolute',
      right: 24,
      top: 'calc(30vh + 93px)'
    },
    osdRoot: {
      background: 'black',
      height: '100%',
    },
    prevItem: {
      left: 84,
      margin: theme.spacing(1),
      position: 'absolute',
      top: 'calc(30vh + 93px)'
    },
    progress: {
      margin: theme.spacing(2),
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex-root',
      marginBottom: '5px',
    },
  }),
)

export const DetailView: React.FC<IDetailView> = (props): ReactElement => {
  const classes: any = useStyles({})
  const currentCollection = getCurrentCollection()
  const navigation = useNavigation()
  const {collection, id} = props
  const size = ESCore.state.getSize()
  const hitIndex = ESCore.state.getHitIndexForId(id)
  const currentHit = ESCore.state.getHitForIndex(hitIndex)
  const prevHit = ESCore.state.getHitForIndex(Math.max(0, hitIndex - 1))
  const prevHitId = prevHit && prevHit.id
  const nextIndex = hitIndex + 1 <= size - 1 ? hitIndex + 1 : size - 1
  const nextHit = ESCore.state.getHitForIndex(nextIndex)
  const nextHitId = nextHit && nextHit.id
  const dispatch = useDispatch()
  const searchFields = ESCore.state.getSearchFields()
  const title = currentHit && (buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, currentHit) || buildHighlightedValueForHit('title', currentHit))
  const manifest = currentHit && (getFirstManifestFromHit(currentHit, Domain.DIGITALISAT) || currentHit._source.manifest)

  const handleGetNextDoc = () => {
    const url = buildDocumentUri(collection, nextHitId)
    dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    navigation.navigate(`/detail/${currentCollection}/${nextHitId}`)
  }

  const handleGetPrevDoc = () => {
    const url = buildDocumentUri(collection, prevHitId)
    dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    navigation.navigate(`/detail/${currentCollection}/${prevHitId}`)
  }

  const cardActions = [
    {
      displayFields: digitalisatDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.DIGITALISAT
    },
    {
      displayFields: beschreibungDisplayFields,
      isNested: true,
      nestedDisplayFields: facetDisplayFields,
      type: Domain.BESCHREIBUNG
    },
    {
      displayFields: personDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.PERSON
    },
    {
      displayFields: annotationDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.ANNOTATION
    },
  ]
  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={currentHit}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  const buildImageViewer = (): ReactElement => {
    return (
      <Grid item style={{height: '50vh', minHeight: '50vh', width: '100%'}} xs={6}>
        {manifest ? (<SimpleImageViewer classes={classes} manifest={manifest}/>) : null}
      </Grid>
    )
  }

  const buildDetailView = (): ReactElement => {
    return (
      <Grid item style={{width: '100%'}} xs={6}>
        <Divider variant='middle'/>
        <Card className={classes.root}>
          <TitleIdHeader
            id={id}
            title={title}
          />
          <div style={{display: 'flex'}}>
            <div className={classes.details}>
              <ValueDisplay
                field={Domain.DOC_SUBTITLE_FIELD}
                hit={currentHit}
                style={{display: 'flex', padding: '10px'}}
                variant='h6'
              />
              {searchFields.map((field, key): ReactElement =>
                <CardContent
                  className={classes.cardContent}
                  key={key}
                >{currentHit._source && currentHit._source[field.field] ?
                    <FieldValueDisplay field={field} hit={currentHit}/> : null}
                </CardContent>)}
              {currentCollection === 'hsp2' ? buildCardActions(cardActions) : null}
            </div>
          </div>
        </Card>
      </Grid>
    )
  }

  return currentHit ? (
    <Grid
      alignItems="center"
      container
      direction="column"
      justify="center"
      key={uuid()}
      spacing={3}
    >
      <Fab
        aria-label="back"
        classes={{root: classes.prevItem}}
        onClick={handleGetPrevDoc}
      >
        <ArrowBack/>
      </Fab>
      {buildImageViewer()}
      {buildDetailView()}
      <Fab
        aria-label="next"
        classes={{root: classes.nextItem}}
        onClick={handleGetNextDoc}
      >
        <ArrowForward/>
      </Fab>
    </Grid>
  ) : null
}

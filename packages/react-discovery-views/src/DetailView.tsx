import {
  ArrowBackButton, ArrowForwardButton,
  Domain, EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields, personDisplayFields,
} from "."
import {Card, CardActions, CardContent, Divider, Grid, Theme, createStyles, makeStyles} from "@material-ui/core"
import {
  FieldValueDisplay,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit, getFirstManifestFromHit,
} from "@react-discovery/components"
import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {SimpleImageViewer} from "@react-discovery/iiif"
import {getCurrentCollection} from "@react-discovery/configuration"
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
    imageGrid: {
      height: '50vh',
      minHeight: '50vh',
      width: '100%'
    },
    osdRoot: {
      background: 'black',
      height: '100%',
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
  const defaultCollection = process.env.REACT_APP_SEARCH_API_COLLECTION
  const {collection, id} = props
  const hitIndex = ESCore.state.getHitIndexForId(id)
  const currentHit = ESCore.state.getHitForIndex(hitIndex)
  const searchFields = ESCore.state.getSearchFields()
  const title = currentHit && (buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, currentHit)
    || buildHighlightedValueForHit('title', currentHit))
  const manifest = currentHit && (getFirstManifestFromHit(currentHit, Domain.DIGITALISAT) || currentHit._source.manifest)

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
      <Grid className={classes.imageGrid} item xs={6}>
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
              {currentCollection === defaultCollection ? buildCardActions(cardActions) : null}
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
      <ArrowBackButton collection={collection} hitIndex={hitIndex}/>
      {buildImageViewer()}
      {buildDetailView()}
      <ArrowForwardButton collection={collection} hitIndex={hitIndex}/>
    </Grid>
  ) : null
}

import {Card, CardActions, CardContent, Theme, createStyles, makeStyles, } from "@material-ui/core"
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
import {Thumbnail} from "@react-discovery/iiif"
import {getCurrentCollection} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"

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

export const SimpleDataView: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {id} = props
  const dispatch = useDispatch()
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const currentCollection = getCurrentCollection()
  const url = buildDocumentUri(currentCollection, id)
  const searchFields = ESCore.state.getSearchFields()
  const title = doc && buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, doc)
  const manifest = doc && getFirstManifestFromHit(doc, Domain.DIGITALISAT)

  useEffect((): void => {
    if (!doc) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [doc])

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
          hit={doc}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
        />
      </CardActions>
    )
  }

  const buildKulturObjekt = (): ReactElement => {
    return (
      <Card className={classes.root}>
        <TitleIdHeader
          id={doc._source.id}
          title={title}
        />
        <div style={{display: 'flex'}}>
          <Thumbnail manifest={manifest}/>
          <div className={classes.details}>
            <ValueDisplay
              field={Domain.DOC_SUBTITLE_FIELD}
              hit={doc}
              style={{display: 'flex', padding: '10px'}}
              variant='h6'
            />
            {searchFields.map((field, key): ReactElement =>
              <CardContent
                className={classes.cardContent}
                key={key}
              >{doc._source && doc._source[field.field] ?
                  <FieldValueDisplay field={field} hit={doc}/> : null}
              </CardContent>)}
            {buildCardActions(cardActions)}
          </div>
        </div>
      </Card>
    )
  }

  return docs && doc ? (
    buildKulturObjekt()
  ) : null
}

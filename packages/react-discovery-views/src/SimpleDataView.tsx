import {Card, CardActions, CardContent, Theme, createStyles, makeStyles, } from "@material-ui/core"
import {Domain, EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  buildRandomUBLThumbnail,
  digitalisatDisplayFields,
  facetDisplayFields, personDisplayFields} from "."
import {ESCore, usePrevious} from "@react-discovery/core"
import {
  FieldValueDisplay,
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
} from "@react-discovery/components"
import React, {ReactElement, useEffect, useState} from "react"
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

const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']


export const SimpleDataView: React.FC<any> = (props): ReactElement => {
  const classes: any = useStyles({})
  const [isInitialized, setIsInitialized] = useState(false)
  const {id} = props
  const dispatch = useDispatch()
  const prevId = usePrevious(id)
  const docs = ESCore.state.getDocuments()
  const doc = Object.keys(docs).length ? docs[id] : null
  const url = process.env.REACT_APP_SEARCH_API_HOST + process.env.REACT_APP_SEARCH_API_COLLECTION + ESCore.enums.ElasticSearchConstants.DOCUMENT + id
  const searchFields = ESCore.state.getSearchFields()
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = doc && buildHighlightedValueForHit('titel_t', doc)

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
      setIsInitialized(true)
    } else if (prevId !== id) {
      dispatch(ESCore.state.fetchElasticSearchDocument.action({url}))
    }
  }, [id, prevId])

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
          <Thumbnail image={buildRandomUBLThumbnail()}/>
          <div className={classes.details}>
            <ValueDisplay
              field={'subtitel_t'}
              hit={doc}
              style={{display: 'flex', padding: '10px'}}
              variant='h6'
            />
            {displayFields.map((field, key): ReactElement =>
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

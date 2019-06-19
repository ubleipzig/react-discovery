import {Card, CardActions, CardContent, Grid, Theme, createStyles, makeStyles} from "@material-ui/core"
import {
  DetailBreadcrumbs,
  Domain,
  EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields,
  personDisplayFields,
  useHitViewStyles,
} from '.'
import {
  FieldValueDisplay,
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
  getTypeForId
} from '@react-discovery/components'
import React, {ReactElement, useEffect, useState} from "react"
import {getHits, getSearchFields, getStringInput, setQueryInput, usePrevious} from "@react-discovery/solr"
import Beschreibung from './Beschreibung'
import Digitalisat from './Digitalisat'
import Person from './Person'
import {SearchAppBar} from '..'
import {buildRandomUBLThumbnail} from "../../utils"
import {useDispatch} from "react-redux"

interface IDetailsView {
  id: string;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    gridActions: {
      alignItems: 'center',
      marginTop: '50px',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

// TODO add this to configuration
const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']

export const DetailsView: React.FC<IDetailsView> = (props): ReactElement => {
  const {id} = props
  const stringInput = getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const [isInitialized, setIsInitialized] = useState(false)
  const hits = getHits()
  const searchFields = getSearchFields()
  const hit = hits && hits.hits.length ? hits.hits[0] : null
  const dispatch = useDispatch()

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(setQueryInput({stringInput: id}))
      setIsInitialized(true)
    } else if (prevStringInput !== stringInput) {
      dispatch(setQueryInput({stringInput: id}))
    }
  })
  const lClasses: any = useStyles({})
  const classes: any = useHitViewStyles({})
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = hit && buildHighlightedValueForHit('titel_t', hit)
  const type = hit && getTypeForId(hit, id)
  const buildKulturObjekt = (): ReactElement => {
    return (
      <Card className={classes.root}>
        <TitleIdHeader
          id={hit._source.id}
          title={title}
        />
        <div style={{display: 'flex'}}>
          <Thumbnail image={buildRandomUBLThumbnail()}/>
          <div className={classes.details}>
            <ValueDisplay
              field={'subtitel_t'}
              hit={hit}
              style={{display: 'flex', padding: '10px'}}
              variant='h6'
            />
            {displayFields.map((field, key): ReactElement =>
              <CardContent
                className={classes.content}
                key={key}
              >{hit._source && hit._source[field.field] ?
                  <FieldValueDisplay field={field} hit={hit}/> : null}
              </CardContent>)}
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={digitalisatDisplayFields}
                hit={hit}
                type={Domain.DIGITALISAT}
              />
            </CardActions>
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={beschreibungDisplayFields}
                hit={hit}
                isNested={true}
                nestedDisplayFields={facetDisplayFields}
                type={Domain.BESCHREIBUNG}
              />
            </CardActions>
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={personDisplayFields}
                hit={hit}
                type={Domain.PERSON}
              />
            </CardActions>
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={annotationDisplayFields}
                hit={hit}
                type={Domain.ANNOTATION}
              />
            </CardActions>
          </div>
        </div>
      </Card>
    )
  }

  const buildObjectForType = (type): ReactElement => {
    switch (type) {
      case Domain.BESCHREIBUNG:
        return (<Beschreibung hit={hit}/>)
      case Domain.DIGITALISAT:
        return (<Digitalisat hit={hit}/>)
      case Domain.KULTUROBJEKT:
        return buildKulturObjekt()
      case Domain.PERSON:
        return (<Person hit={hit}/>)
    }
  }

  return <Grid container>
    <Grid item xs={12}>
      <SearchAppBar/>
    </Grid>
    <Grid
      item xs={12}
    >
      <Grid
        className={lClasses.gridActions}
        container
        direction="row"
      >
        <DetailBreadcrumbs/>
      </Grid>
      {hit && type ?
        buildObjectForType(type) : null}
    </Grid>
  </Grid>
}

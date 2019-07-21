import {Card, CardActions, CardContent, Grid, Theme, createStyles, makeStyles, useMediaQuery} from "@material-ui/core"
import {
  DetailBreadcrumbs,
  EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields,
  personDisplayFields
} from "."
import {ESCore, usePrevious} from "@react-discovery/core"
import {
  FieldValueDisplay,
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
  getTypeForId,
} from '@react-discovery/components'
import {MinWidthResultsGrid, PersistentDrawer, SearchAppBar} from '..'
import React, {ReactElement, useEffect, useState} from "react"
import DefaultHitComponent from './DefaultHitComponent'
import {Domain} from "../../enum"
import {buildRandomUBLThumbnail} from "../../utils"
import classNames from 'classnames'
import {useDispatch} from "react-redux"

interface IDetailsView {
  id: string;
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    cardContent: {
      display: 'flex',
      flex: '1 0 auto',
      padding: 0,
    },
    content: {
      backgroundColor: '#fafafa',
      flexGrow: 1,
      marginLeft: drawerWidth,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    contentShift: {
      backgroundColor: '#fafafa',
      marginLeft: 73,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
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

// TODO add this to configuration
const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']

export const DetailsView: React.FC<IDetailsView> = (props): ReactElement => {
  const {id} = props
  const classes: any = useStyles({})
  const stringInput = ESCore.state.getStringInput()
  const prevStringInput = usePrevious(stringInput)
  const [isInitialized, setIsInitialized] = useState(false)
  const hits = ESCore.state.getHits()
  const searchFields = ESCore.state.getSearchFields()
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const hit = hits && hits.hits.length ? hits.hits[0] : null
  const dispatch = useDispatch()
  const matches = useMediaQuery('(min-width:600px)')
  const title = hit && buildHighlightedValueForHit('titel_t', hit)

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(ESCore.state.setQueryInput({stringInput: id}))
      setIsInitialized(true)
    } else if (prevStringInput !== stringInput) {
      dispatch(ESCore.state.setQueryInput({stringInput: id}))
    }
  })
  const lClasses: any = useStyles({})
  const type = hit && getTypeForId(hit, id)

  const [open, setOpen] = React.useState(true)

  const handleDrawerChange = (): void => {
    setOpen(!open)
  }

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
                className={classes.cardContent}
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
    if (type === Domain.KULTUROBJEKT) {
      return buildKulturObjekt()
    } else {
      return (<DefaultHitComponent
        hit={hit}
      />)
    }
  }

  return (
    <Grid container>
      <SearchAppBar
        handleDrawerChange={handleDrawerChange}/>
      <Grid
        item
        xs={12}
      >
        <PersistentDrawer open={open}/>
        {matches ?
          <main
            className={classNames({[classes.content]: open}, {
              [classes.contentShift]: !open,
            })}
          >
            <Grid
              className={lClasses.gridActions}
              container
              direction="row"
            >
              <DetailBreadcrumbs/>
            </Grid>
            {hit && type ?
              buildObjectForType(type) : null
            }
          </main> : <MinWidthResultsGrid/>
        }
      </Grid>
    </Grid>)
}

import {Button, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles} from '@material-ui/core'
import {ESCore, IElasticSearchQuery, usePrevious} from "@react-discovery/core"
import {
  ICollection,
  getCollectionByKey,
  getCollections,
  getCurrentCollection,
  getCurrentSearchContext, getRootContext, setCurrentCollection
} from '@react-discovery/configuration'
import React, {ReactElement, useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {useNavigation} from 'react-navi'

const useStyles = makeStyles((): any => ({
  card: {
    margin: '4px',
    maxHeight: 300,
    maxWidth: 300,
    minWidth: 300,
  },
  media: {
    height: 170,
    width: 170,
  },
  root: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'block',
  },
}))

export const Collections: React.FC<any> = (): ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false)
  const classes: any = useStyles({})
  const dispatch = useDispatch()
  const collections = getCollections()
  const rootContext = getRootContext()
  const currentSearchContext = getCurrentSearchContext()
  const currentCollection = getCurrentCollection()
  const collectionObj = getCollectionByKey(currentCollection)
  const jsonCollection = JSON.stringify(collectionObj)
  const prevJsonCollection = usePrevious(jsonCollection)
  const navigation = useNavigation()
  const size = ESCore.state.getSize()

  useEffect((): void => {
    if (!isInitialized) {
      setIsInitialized(true)
    }
    if (prevJsonCollection !== jsonCollection) {
      const {initialFilter, refinementListFilters, searchFields, sortFields} = collectionObj
      const aggs = ESCore.builders.buildAggs(refinementListFilters)
      const qs: IElasticSearchQuery = {
        aggs,
        filters: initialFilter || {},
        from: 0,
        searchFields,
        size: size || 20,
        sortFields,
        stringInput: null,
      }
      dispatch(ESCore.state.setQueryFields({...qs}))
      if (isInitialized) {
        navigation.navigate(currentSearchContext)
      }
    }
  }, [prevJsonCollection, jsonCollection])

  const buildCollections = (): any[] => {
    return Object.keys(collections).map((key: string) => {
      return {
        imageSrc: (collections[key] as ICollection).logo,
        index: key,
        key,
        linkPath: rootContext + '/' + key,
        text: (collections[key] as ICollection).name,
        title: (collections[key] as ICollection).name,
      }
    })
  }

  const handleIndexChange = (collectionIndex): void => {
    dispatch(setCurrentCollection({currentCollection: collectionIndex}))
  }

  const buildCards = (collectionObjs): ReactElement[] => {
    return collectionObjs && collectionObjs.map((card): ReactElement =>
      <Card
        className={classes.card}
        key={card.index}
      >
        <CardActionArea onClick={(): void => handleIndexChange(card.index)}>
          <CardMedia
            className={classes.media}
            classes={{root: classes.root}}
            image={card.imageSrc}
            title={card.title}
          />
        </CardActionArea>
        <CardContent>
          <Button onClick={(): void => handleIndexChange(card.index)} size="small">{card.text}</Button>
        </CardContent>
      </Card>)
  }

  return (
    <Grid
      alignItems="center"
      container
      direction="row"
      justify="center"
      spacing={3}
    >
      <Grid item style={{display: 'flex', flexWrap: 'wrap', width: '100%'}} xs={10}>
        {buildCards(buildCollections())}
      </Grid>
    </Grid>
  )
}


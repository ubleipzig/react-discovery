import {Button, Card, CardContent, CardMedia, Grid, makeStyles} from '@material-ui/core'
import React, {ReactElement} from 'react'
import { NavLink } from 'react-navi'

const useStyles = makeStyles((): any => ({
  card: {
    margin: '4px',
    maxHeight: 300,
    maxWidth: 300,
    minWidth: 300,
  },
  media: {
    height: 250,
  },
}))

export const Landing: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})

  const cards = [
    {
      imageSrc: 'https://iiif.bodleian.ox.ac.uk/iiif/image/8a62827b-95ec-483a-a49e-2c92fc741100/full/256,/0/default.jpg',
      index: 0,
      linkPath: '/workspace',
      text: 'Workspace',
      title: 'View Workspace',
    },
    {
      imageSrc: 'https://iiif.bodleian.ox.ac.uk/iiif/image/b2c352ee-1356-4c8c-9c11-7c6d7f3587b2/full/256,/0/default.jpg',
      index: 1,
      linkPath: '/search',
      text: 'Search',
      title: 'Search',
    },
  ]

  const buildCards = (cards): JSX.Element => {
    return cards.map((card) =>
      <Card
        className={classes.card}
        key={card.index}
      >
        <NavLink href={card.linkPath} title={card.title} >
          <CardMedia
            className={classes.media}
            image={card.imageSrc}
            title={card.title}
          />
          <CardContent>
            <Button size="small">{card.text}</Button>
          </CardContent>
        </NavLink>
      </Card>)
  }

  return (
    <>
      <Grid
        alignItems="center"
        container
        direction="column"
        justify="center"
        spacing={3}
      >
        <Grid item style={{display: 'flex'}} xs={8}>
          {buildCards(cards)}
        </Grid>
      </Grid>
    </>
  )
}


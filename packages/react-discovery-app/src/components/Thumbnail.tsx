import {CardMedia, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"

interface IThumbnail {
  image: string;
}

const useStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
    width: '8%',
  },
}))

export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = useStyles({})
  const {image} = props
  return (
    <div className={classes.cover}>
      <CardMedia
        alt="Placeholder"
        component="img"
        image={image}
        title="Thumbnail"
      />
    </div>
  )
}

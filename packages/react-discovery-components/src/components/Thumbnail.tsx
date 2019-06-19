import React, {ReactElement} from "react"
import {CardMedia} from "@material-ui/core"
import {useThumbnailStyles} from "../styles"

interface IThumbnail {
  image: string;
}

export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = useThumbnailStyles({})
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

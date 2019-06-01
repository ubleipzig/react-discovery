import {CardMedia, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {buildRandomUBLThumbnail} from "../../utils"

const useStyles = makeStyles((): any => ({
  cover: {
    padding: 20,
    width: '8%',
  },
}))

export const RandomThumbnail: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  return (
    <CardMedia
      alt="Placeholder"
      className={classes.cover}
      component="img"
      height="140"
      image={buildRandomUBLThumbnail()}
      title="Thumbnail"
    />
  )
}

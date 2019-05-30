import React, {ReactElement} from "react"
import CardMedia from "@material-ui/core/CardMedia"
import {buildRandomUBLThumbnail} from "../../utils"
import {makeStyles} from "@material-ui/core"

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

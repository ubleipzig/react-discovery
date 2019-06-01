import {CardMedia, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {buildRandomUBLThumbnail} from "../../utils"

const useStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
    width: '8%',
  },
}))

export const RandomThumbnail: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  return (
    <div className={classes.cover}>
      <CardMedia
        alt="Placeholder"
        component="img"
        image={buildRandomUBLThumbnail()}
        title="Thumbnail"
      />
    </div>
  )
}

import React, {ReactElement} from "react"
import {Grid} from "@material-ui/core"
import {Thumbnail} from "@react-discovery/components"
import {buildRandomUBLThumbnail} from "./utils"
import {useThumbnailStyles} from "."

export const ThumbnailGrid: React.FC<any> = (): ReactElement => {
  const thumbnailClasses = useThumbnailStyles({})
  return (
    <Grid>
      <Thumbnail
        classes={thumbnailClasses}
        image={buildRandomUBLThumbnail()}/>
    </Grid>
  )
}

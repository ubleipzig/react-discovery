import React, {ReactElement} from "react"
import {Grid} from "@material-ui/core"
import {Thumbnail} from "@react-discovery/iiif"
import {buildRandomUBLThumbnail} from "./utils"
import {useThumbnailStyles} from "."

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const {manifest} = props
  const thumbnailClasses = useThumbnailStyles({})
  return (
    <Grid>
      <Thumbnail
        classes={thumbnailClasses}
        image={buildRandomUBLThumbnail()}
        manifest={manifest}
      />
    </Grid>
  )
}

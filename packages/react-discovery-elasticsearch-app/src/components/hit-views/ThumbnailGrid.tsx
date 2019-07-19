import {Book, ChatBubble, Image} from "@material-ui/icons"
import {CardActions, Grid, Typography} from "@material-ui/core"
import React, {ReactElement} from "react"
import {Thumbnail, buildEntityCountForType} from "@react-discovery/components"
import {Domain} from "../../enum"
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles} from "./useHitViewStyles"
import {useThumbnailStyles} from "./Kulturobjekt"
import {useTranslation} from "react-i18next"

export const ThumbnailGrid: React.FC<any> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const thumbnailClasses = useThumbnailStyles({})
  const {entities} = props
  const {t} = useTranslation('vocab')

  return (
    <Grid>
      <Thumbnail
        classes={thumbnailClasses}
        image={buildRandomUBLThumbnail()}/>
      <CardActions disableSpacing>
        <Image fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
        <Typography
          className={classes.heading}
          variant='body2'
        >
          {t(Domain.DIGITALISAT)} <i>({buildEntityCountForType(entities, Domain.DIGITALISAT)})</i>
        </Typography>
      </CardActions>
      <CardActions disableSpacing>
        <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
        <Typography
          className={classes.heading}
          variant='body2'
        >
          {t(Domain.BESCHREIBUNG)} <i>({buildEntityCountForType(entities, Domain.BESCHREIBUNG)})</i>
        </Typography>
      </CardActions>
      <CardActions disableSpacing>
        <ChatBubble fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
        <Typography
          className={classes.heading}
          variant='body2'
        >
          {t(Domain.ANNOTATION)} <i>({buildEntityCountForType(entities, Domain.ANNOTATION)})</i>
        </Typography>
      </CardActions>
    </Grid>
  )
}

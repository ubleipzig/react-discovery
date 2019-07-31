import {makeStyles} from "@material-ui/core"

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
    padding: 20,
  },
  media: {
    borderRadius: 8,
    objectFit: 'cover',
    width: 'auto'
  },
}))

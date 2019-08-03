import {makeStyles} from "@material-ui/core"

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    border: 'solid',
    borderColor: '#dedede',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    padding: 36,
  },
  media: {
    borderRadius: 8,
    maxWidth: 180,
    objectFit: 'cover',
  },
}))

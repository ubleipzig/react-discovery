import {makeStyles} from "@material-ui/core"

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    border: 'solid',
    borderColor: '#dedede',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    maxHeight: 'fit-content',
    padding: 36,
  },
  gridList: {
    display: 'table-cell',
    listStyle: 'none'
  },
  media: {
    borderRadius: 8,
    maxWidth: 180,
    objectFit: 'cover',
  },
  root: {
    background: 'whitesmoke',
    flexGrow: 1,
    padding: 24
  }
}))

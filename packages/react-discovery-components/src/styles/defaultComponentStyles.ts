import {Theme, createStyles, makeStyles} from "@material-ui/core"

export const useFacetViewSwitcherStyles = makeStyles((theme: Theme): any =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const useFieldLabelStyles = makeStyles((): any => ({
  fieldLabel: {margin: "0 20px 0 10px", minWidth: 180},
}))

export const useFlexBoxStyles = makeStyles((): any => ({
  flexBox: {display: 'flex'}
}))

export const useGroupSelectedFiltersStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  icon: {
    fontSize: 20,
  },
}))

export const useInnerHtmlValueStyles = makeStyles((): any => ({
  values: {
    '& em': {
      background: '#cfe1f3'
    }
  }
}))

export const useItemListStyles = makeStyles((theme): any => ({
  content: {
    display: 'flex',
    flex: '1 0 auto',
    padding: 0,
  },
  expanded: {
    maxHeight: 32,
    minHeight: 0
  },
  expansionSummaryRoot: {
    '&$expanded': {
      maxHeight: 36,
      minHeight: 0
    },
    maxHeight: 36,
    minHeight: 0,
  },
  grow: {
    flexGrow: 1
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  inline: {
    display: 'inline',
    textAlign: 'right'
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  }
}))

export const useMenuButtonStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const useMinimalResultViewerStyles = makeStyles((theme: Theme): any =>
  createStyles({
    gridActions: {
      alignItems: 'center',
      marginTop: '50px',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    gridLeft: {
      backgroundColor: 'whitesmoke',
      marginTop: 280,
      padding: 10
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const useMinWidthResultsGridStyles = makeStyles((theme: Theme): any =>
  createStyles({
    gridActions: {
      alignItems: 'center',
      marginTop: '50px',
      padding: '10px'
    },
    gridContent: {
      backgroundColor: 'lightgray',
      padding: 20
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

export const usePaginationStyles = makeStyles((theme): any => ({
  button: {
    border: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
    }`,
    padding: '5px 16px',
  },
}))

export const useRelatedItemsStyles = makeStyles((theme: Theme): any =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
  }),
)

export const useResetButtonStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const useSearchAppBarStyles = makeStyles((theme): any => ({
  colorPrimary: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
  },
  grow: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: '1000'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

export const useSearchBoxStyles = makeStyles((theme): any => ({
  container: {
    display: 'flex',
    flex: '1',
    justifyContent: 'space-evenly',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    maxHeight: '32px',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  dense: {
    marginTop: 19,
  },
  divider: {
    height: 32,
    margin: 4,
    width: 1,
  },
  input: {
    backgroundColor: 'white', margin: 8
  },
  menu: {
    width: 200,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    padding: '2px 4px',
    width: '50%',
  }
}))

export const useSortingSelectorStyles = makeStyles((theme): any => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const useSuggesterStyles = makeStyles((theme): any => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  container: {
    flexGrow: 1,
    height: '105px',
    padding: '8px',
    position: 'relative',
  },
  divider: {
    height: theme.spacing(2),
  },
  inputInput: {
    flexGrow: 1,
    width: 'auto',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  label: {
    whiteSpace: 'initial'
  },
  paper: {
    left: 0,
    marginTop: theme.spacing(1),
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  root: {
    flexGrow: 1,
  },
}))

export const useTabsAppBarStyles = makeStyles((theme: Theme): any => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    minHeight: 290,
    padding: 20,
    width: '8%',
  },
}))

export const useValueDisplayStyles = makeStyles((): any => ({
  inline: {
    display: 'inline',
  },
}))

export const useViewSwitcherStyles = makeStyles((theme): any => ({
  formControl: {
    justifyContent: 'center',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

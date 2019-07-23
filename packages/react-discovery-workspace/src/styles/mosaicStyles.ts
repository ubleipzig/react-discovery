import {makeStyles} from "@material-ui/core"

export const useMosaicStyles = makeStyles((): any => ({
  '@global': {
    '.mosaic': {
      height: '100%',
      width: '100%',
    },
    '.mosaic .mosaic-zero-state': {
      bottom: 6,
      height: 'auto',
      left: 6,
      position: 'absolute',
      right: 6,
      top: 6,
      width: 'auto',
      zIndex: 1,
    },
    '.mosaic, .mosaic > *': {
      boxSizing: 'border-box',
    },
    '.mosaic-drop-target': {
    },
    '.mosaic-drop-target .drop-target-container': {
      bottom: 0,
      display: 'none',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '.mosaic-drop-target .drop-target-container .drop-target': {
      background: 'rgba(0, 0, 0, 0.2)',
      border: '2px solid black',
      bottom: '0',
      left: '0',
      opacity: 0,
      position: 'absolute',
      right: '0',
      top: '0',
      zIndex: 5,
    },
    '.mosaic-drop-target .drop-target-container .drop-target.bottom': {
      top: 'calc(100% -  30% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.drop-target-hover': {
      opacity: 1,
    },
    '.mosaic-drop-target .drop-target-container .drop-target.drop-target-hover.bottom': {
      top: 'calc(100% -  50% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.drop-target-hover.left': {
      right: 'calc(100% -  50% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.drop-target-hover.right': {
      left: 'calc(100% -  50% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.drop-target-hover.top': {
      bottom: 'calc(100% -  50% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.left': {
      right: 'calc(100% -  30% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.right': {
      left: 'calc(100% -  30% )',
    },
    '.mosaic-drop-target .drop-target-container .drop-target.top': {
      bottom: 'calc(100% -  30% )',
    },

    '.mosaic-drop-target .drop-target-container.-dragging': {
      display: 'block',
    },
    '.mosaic-drop-target.drop-target-hover .drop-target-container': {
      display: 'block',
    },
    '.mosaic-drop-target.mosaic > .drop-target-container .drop-target.bottom': {
      top: 'calc(100% -  10px )',
    },
    '.mosaic-drop-target.mosaic > .drop-target-container .drop-target.left': {
      right: 'calc(100% -  10px )',
    },
    '.mosaic-drop-target.mosaic > .drop-target-container .drop-target.right': {
      left: 'calc(100% -  10px )',
    },
    '.mosaic-drop-target.mosaic > .drop-target-container .drop-target.top': {
      bottom: 'calc(100% -  10px )',
    },
    '.mosaic-root': {
      background: '#d9d9da',
      bottom: 3,
      left: 76,
      position: 'absolute',
      right: 3,
      top: 63,
    },
    '.mosaic-split': {
      position: 'absolute',
      touchAction: 'none',
      zIndex: 1,
    },
    '.mosaic-split .mosaic-split-line': {
      position: 'absolute',
    },
    '.mosaic-split.-column': {
      cursor: 'ns-resize',
      height: 6,
      marginTop: -3,
    },
    '.mosaic-split.-column .mosaic-split-line': {
      bottom: 3,
      left: 0,
      right: 0,
      top: 3,
    },
    '.mosaic-split.-row': {
      cursor: 'ew-resize',
      marginLeft: -3,
      width: 6,
    },
    '.mosaic-split.-row .mosaic-split-line': {
      bottom: '0',
      left: 3,
      right: 3,
      top: '0',
    },
    '.mosaic-tile': {
      margin: 3,
      position: 'absolute',
    },

    '.mosaic-tile > *': {
      height: '100%',
      width: '100%',
    },
    '.mosaic-window .mosaic-preview .mosaic-window-body, .mosaic-preview .mosaic-preview .mosaic-window-body': {
      alignItems: 'center',
      display: 'flex',
      fallbacks: {
        W: 'center',
      },
      flexDirection: 'column',
      justifyContent: 'center',
      W: 'center',
    },
    '.mosaic-window .mosaic-preview h4, .mosaic-preview .mosaic-preview h4': {
      marginBottom: 10,
    },
    '.mosaic-window .mosaic-preview, .mosaic-preview .mosaic-preview': {
      border: '1px solid black',
      height: '100%',
      maxHeight: 400,
      position: 'absolute',
      width: '100%',
      zIndex: 0,
    },
    '.mosaic-window .mosaic-window-additional-actions-bar .bp3-button, .mosaic-preview .mosaic-window-additional-actions-bar .bp3-button': {
      margin: '0',
    },
    '.mosaic-window .mosaic-window-additional-actions-bar .bp3-button:after, .mosaic-preview .mosaic-window-additional-actions-bar .bp3-button:after': {
      display: 'none',
    },
    '.mosaic-window .mosaic-window-additional-actions-bar, .mosaic-preview .mosaic-window-additional-actions-bar': {
      background: 'white',
      bottom: 'initial',
      display: 'flex',
      fallbacks:
        {
          display: '-webkit-box',
        },
      height: 0,
      justifyContent: 'flex-end',
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 30,
      W: 'end',
      zIndex: 3,
    },
    '.mosaic-window .mosaic-window-body, .mosaic-preview .mosaic-window-body': {
      background: 'white',
      flex: 1,
      height: 0,
      overflowY: 'scroll',
      position: 'relative',
      W: 1,
      zIndex: 1,
    },
    '.mosaic-window .mosaic-window-body-overlay, .mosaic-preview .mosaic-window-body-overlay': {
      background: 'white',
      bottom: 0,
      display: 'none',
      left: 0,
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 2,
    },
    '.mosaic-window .mosaic-window-controls .separator, .mosaic-preview .mosaic-window-controls .separator': {
      borderLeft: '1px solid black',
      height: 20,
      margin: '5px 4px',
    },
    '.mosaic-window .mosaic-window-controls, .mosaic-preview .mosaic-window-controls': {
      display: 'flex',
      fallbacks: {
        display: '-webkit-box',
      },
      height: '100%',
    },
    '.mosaic-window .mosaic-window-title, .mosaic-preview .mosaic-window-title': {
      flex: '1',
      minHeight: 18,
      overflow: 'hidden',
      paddingLeft: 15,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.mosaic-window .mosaic-window-toolbar, .mosaic-preview .mosaic-window-toolbar': {
      alignItems: 'center',
      background: 'white',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      fallbacks: {
        W: 'justify',
      },
      flexShrink: 0,
      height: 30,
      justifyContent: 'space-between',
      W: 'center',
      zIndex: 4,
    },
    '.mosaic-window .mosaic-window-toolbar.draggable, .mosaic-preview .mosaic-window-toolbar.draggable': {
      cursor: 'move',
    },
    '.mosaic-window, .mosaic-preview': {
      boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      fallbacks:
        {
          W: 'vertical',
        },
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      W: 'normal',
    },
    '.mosaic-window.additional-controls-open .mosaic-window-additional-actions-bar, .mosaic-preview.additional-controls-open .mosaic-window-additional-actions-bar': {
      height: 30,
    },
    '.mosaic-window.additional-controls-open .mosaic-window-body-overlay, .mosaic-preview.additional-controls-open .mosaic-window-body-overlay': {
      display: 'block',
    },
    '.mosaic:not(.mosaic-blueprint-theme) .mosaic-default-control.close-button:before': {
      content: '\'Close\'',
    },
    '.mosaic:not(.mosaic-blueprint-theme) .mosaic-default-control.expand-button:before': {
      content: '\'Expand\'',
    },
    '.mosaic:not(.mosaic-blueprint-theme) .mosaic-default-control.replace-button:before': {
      content: '\'Replace\'',
    },
    '.mosaic:not(.mosaic-blueprint-theme) .mosaic-default-control.split-button:before': {
      content: '\'Split\'',
    },
  }
}))

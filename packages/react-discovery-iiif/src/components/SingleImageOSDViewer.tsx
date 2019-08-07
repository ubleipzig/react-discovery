import React, {ReactElement, useEffect, useRef, useState} from 'react'
import OpenSeadragon from 'openseadragon'
import {makeStyles} from "@material-ui/core"
import {usePrevious} from "@react-discovery/core"

export interface ISingleImageOsdComponentProps {
  image?: any;
}

const useStyles = makeStyles((): any => ({
  osdRoot: {
    background: 'black',
    height: '75%',
    position: 'absolute',
    width: '100%'
  }
}))

export const SingleImageOSDViewer: React.FC<ISingleImageOsdComponentProps> = (props): ReactElement => {
  const classes: any = useStyles({})
  const [isInitialized, setIsInitialized] = useState(false)
  const [osd, setOsd] = useState(null)
  const osdRef = useRef(null)
  const {image} = props
  const prevImage = usePrevious(image)

  const defaultOsdProps = () => {
    let showNavigator = false
    let showReferenceStrip = false
    const ajaxHeaders = {
      // "x-requested-with": "XMLHttpRequest",
    }
    // @ts-ignore
    return {
      ajaxHeaders,
      constrainDuringPan: false,
      crossOriginPolicy: 'Anonymous',
      defaultZoomLevel: 0,
      element: osdRef.current,
      loadTilesWithAjax: true,
      maxZoomLevel: 10,
      minZoomLevel: 0,
      navigatorPosition: 'BOTTOM_RIGHT',
      referenceStripScroll: 'vertical',
      sequenceMode: false,
      showFullPageControl: false,
      showHomeControl: false,
      showNavigator,
      showReferenceStrip,
      showRotationControl: false,
      showSequenceControl: false,
      showZoomControl: false,
      visibilityRatio: 0.5,
    }
  }

  const updateViewer = (config) => {
    if (!osd) {
      const osd = new OpenSeadragon(config)
      osd.open([{
        tileSource: image
      }])
      osd.viewport.goHome(true)
      setOsd(osd)
    } else {
      osd.open([{
        tileSource: image
      }])
      osd.viewport.goHome(true)
    }
  }

  useEffect(
    (): void => {
      if (!isInitialized && image) {
        updateViewer(defaultOsdProps())
        setIsInitialized(true)
      } else if (prevImage !== image) {
        updateViewer(defaultOsdProps())
      }
    })

  return (
    <div
      className={classes.osdRoot}
      ref={osdRef}
    />
  )
}

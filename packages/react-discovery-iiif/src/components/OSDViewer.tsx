import React, {ReactElement, useEffect, useRef, useState} from 'react'
import OpenSeadragon from 'openseadragon'
import {makeStyles} from "@material-ui/core"

export interface IOsdComponentProps {
  classes?: any;
  images: string[];
}

const useStyles = makeStyles((): any => ({
  osdRoot: {
    background: 'black',
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
}))

export const OSDViewer: React.FC<IOsdComponentProps> = (props): ReactElement => {
  const classes: any = props.classes || useStyles({})
  const [isInitialized, setIsInitialized] = useState(false)
  const [osd, setOsd] = useState(null)
  const osdRef = useRef(null)
  const {images} = props

  const defaultOsdProps = (): {} => {
    let showNavigator = true
    let showReferenceStrip = true
    const ajaxHeaders = {
      // "x-requested-with": "XMLHttpRequest",
    }

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
      sequenceMode: true,
      showFullPageControl: false,
      showHomeControl: false,
      showNavigator,
      showReferenceStrip,
      showRotationControl: false,
      showSequenceControl: false,
      showZoomControl: false,
      tileSources: [images],
      visibilityRatio: 0.5,
    }
  }

  const updateViewer = (config): void => {
    if (!osd) {
      const osd = new OpenSeadragon(config)
      osd.viewport.goHome(true)
      setOsd(osd)
    }
  }

  useEffect(
    (): void => {
      if (!isInitialized) {
        updateViewer(defaultOsdProps())
        setIsInitialized(true)
      }
    })

  return (
    <div
      className={classes.osdRoot}
      ref={osdRef}
    />
  )
}

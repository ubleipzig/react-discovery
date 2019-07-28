import React, {ReactElement, useEffect, useRef, useState} from 'react'
import OpenSeadragon from 'openseadragon'

export interface IOsdComponentProps {
  images?: any;
}

export const OSDViewer: React.FC<IOsdComponentProps> = (props): ReactElement => {
  const [osd, setOsd] = useState(false)
  const osdRef = useRef(null)
  const getImages = () => {
    return props.images
  }

  const defaultOsdProps = () => {
    let showNavigator = true
    let showReferenceStrip = true
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
      sequenceMode: true,
      showFullPageControl: false,
      showHomeControl: false,
      showNavigator,
      showReferenceStrip,
      showRotationControl: false,
      showSequenceControl: false,
      showZoomControl: false,
      tileSources: [getImages()],
      visibilityRatio: 0.5,
    }
  }


  const updateViewer = (config) => {
    if (!osd) {
      const osd = new OpenSeadragon(config)
      osd.viewport.goHome(true)
      setOsd(osd)
    }
  }

  useEffect(
    () => {
      if (props.images) {
        updateViewer(defaultOsdProps())
      }
    })

  return (
    <div ref={osdRef} style={{background: 'black', height: '100%', position: 'absolute', width: '100%'}} />
  )
}

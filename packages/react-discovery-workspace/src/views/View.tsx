import React, {ReactElement} from "react"
import {SimpleDataView, SimpleImageView} from "@react-discovery/views"

const View: React.FC<any> = (props): ReactElement => {
  const {id, manifest, viewType} = props

  const buildViewForType = (): ReactElement => {
    switch (viewType) {
      case 'data':
        return <SimpleDataView id={id}/>
      case 'image':
        return <SimpleImageView id={id} manifest={manifest}/>
      default:
        return <SimpleDataView id={id}/>
    }
  }
  return buildViewForType()
}

export default View

import React, {ReactElement} from "react"
import {SimpleDataView, SimpleImageView} from "@react-discovery/views"

const View: React.FC<any> = (props): ReactElement => {
  const {id, viewType} = props

  const buildViewForType = () => {
    switch (viewType) {
      case 'data':
        return <SimpleDataView id={id}/>
      case 'image':
        return <SimpleImageView id={id}/>
      default:
        return <SimpleDataView id={id}/>
    }
  }
  return buildViewForType()
}

export default View

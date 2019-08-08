import React, {ReactElement} from "react"
import {SimpleDataView, SimpleImageView} from "@react-discovery/views"

type ViewType = 'data' | 'image'

interface IView {
  id: string;
  manifest?: string;
  viewType: ViewType;
}

const View: React.FC<IView> = (props): ReactElement => {
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

import React, {ReactElement} from "react"
import {SimpleDataView, SimpleImageView} from "@react-discovery/views"

type ViewType = 'data' | 'image'

interface IView {
  collection: string;
  id: string;
  manifest?: string;
  viewType: ViewType;
}

const View: React.FC<IView> = (props): ReactElement => {
  const {collection, id, manifest, viewType} = props

  const buildViewForType = (): ReactElement => {
    switch (viewType) {
      case 'data':
        return <SimpleDataView collection={collection} id={id}/>
      case 'image':
        return <SimpleImageView collection={collection} id={id} manifest={manifest}/>
      default:
        return <SimpleDataView collection={collection} id={id}/>
    }
  }
  return buildViewForType()
}

export default View

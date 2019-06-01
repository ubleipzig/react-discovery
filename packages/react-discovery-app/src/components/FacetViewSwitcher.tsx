import React, {ReactElement} from "react"
import {getFilterType, getHitComponents, getIsViewExpanded} from "@react-discovery/solr"
import {Hits} from "."

const CUSTOM_COMPONENT_PATH = './hit-views/'

export const FacetViewSwitcher: React.FC<any> = (props): ReactElement => {
  const filterType = getFilterType()
  const hitComponents = getHitComponents()
  const isViewExpanded = getIsViewExpanded()

  const buildHitComponent = (): any => {
    const [defaultHitComponent] = hitComponents.filter((hc): boolean => hc.defaultOption === true)
    const [expandedComponent] = hitComponents.filter((hc): boolean => hc.expandedView === true)
    const [facetComponent] = hitComponents.filter((hc): boolean => hc.key === 'facet' && hc.hitComponent === filterType)
    const hitComponent = isViewExpanded ? expandedComponent : facetComponent || defaultHitComponent
    return hitComponent ? require(`${CUSTOM_COMPONENT_PATH}${hitComponent.hitComponent}`)
      : require(`${CUSTOM_COMPONENT_PATH}${defaultHitComponent.hitComponent}`)
  }

  const Component = buildHitComponent()
  const options = {
    ...props,
    hitComponent: Component.default
  }

  return (<Hits {...options}/>)
}

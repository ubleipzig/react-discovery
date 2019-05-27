import React, {ReactElement} from "react"
import {connect} from "react-redux"
import {Hits} from "."

interface IFacetViewSwitcher {
  currentHitComponent: string;
  filterType: string;
  hitComponents: [
    {key: string;
      title: string;
      hitComponent: string;
      defaultOption?: boolean;
      expandedView?: boolean;
    }];
  isViewExpanded: boolean;
}

const CUSTOM_COMPONENT_PATH = './hit-views/'

const FacetViewSwitcherComponent: React.FC<any> = (props: IFacetViewSwitcher): ReactElement => {
  const {filterType, hitComponents, isViewExpanded} = props

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

const mapStateToProps = (state): any => ({
  currentHitComponent: state.config.currentHitComponent,
  filterType: state.query.filters && state.query.filters.type_s && state.query.filters.type_s[0],
  hitComponents: state.config.collections[state.config.currentCollection].hitComponents,
  isViewExpanded: state.config.isViewExpanded
})

export const FacetViewSwitcher: any = connect(mapStateToProps, null)(FacetViewSwitcherComponent)

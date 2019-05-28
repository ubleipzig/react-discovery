import React, {ReactElement} from "react"
import {Hits} from "."
import {useSelector} from "react-redux"

interface IHitComponent {
  key: string;
  title: string;
  hitComponent: string;
  defaultOption?: boolean;
  expandedView?: boolean;
}

interface IFacetViewSwitcher {
  currentHitComponent: string;
  filterType: string;
  hitComponents: IHitComponent[];
  isViewExpanded: boolean;
}

const CUSTOM_COMPONENT_PATH = './hit-views/'

export const FacetViewSwitcher: React.FC<any> = (props: IFacetViewSwitcher): ReactElement => {
  const filterType = useSelector((state: any): string =>
    state.query.filters && state.query.filters.type_s && state.query.filters.type_s[0])
  const hitComponents = useSelector((state: any): IHitComponent[] =>
    state.config.collections[state.config.currentCollection].hitComponents)
  const isViewExpanded = useSelector((state: any): boolean => state.config.isViewExpanded)

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

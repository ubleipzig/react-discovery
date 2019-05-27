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
    }];
}

const FacetViewSwitcherComponent: React.FC<any> = (props: IFacetViewSwitcher): ReactElement => {
  const {currentHitComponent, filterType, hitComponents} = props

  const buildHitComponent = (): any => {
    const defaultHitComponent = hitComponents.filter((hc): boolean => hc.defaultOption === true)
    const hitComponent = filterType ? hitComponents.filter((hc): boolean => hc.key === 'facet' && hc.hitComponent === filterType) :
      hitComponents.filter((hc): boolean => hc.hitComponent === currentHitComponent)
    return hitComponent.length ? require(`./hit-views/${hitComponent[0].hitComponent}`) : require(`./hit-views/${defaultHitComponent[0].hitComponent}`)
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
})

export const FacetViewSwitcher: any = connect(mapStateToProps, null)(FacetViewSwitcherComponent)

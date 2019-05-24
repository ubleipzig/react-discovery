import React, {ReactElement} from "react"
import {setDisMaxQuery, setSelectedFilters, setStart} from "solr-react-faceted-search"
import {connect} from "react-redux"
import {Hits} from "."

interface IViewSwitcher {
  currentHitComponent: string;
  hitComponents: [
    {key: string;
      title: string;
      hitComponent: string;
      defaultOption?: boolean;
    }];
}

const ViewSwitcherComponent: React.FC<any> = (props: IViewSwitcher): ReactElement => {
  const {currentHitComponent, hitComponents} = props

  const buildHitComponent = () => {
    const defaultHitComponent = hitComponents.filter((hc): boolean => hc.defaultOption === true)
    const hitComponent = hitComponents.filter((hc): boolean => hc.hitComponent === currentHitComponent)
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
  currentHitComponent: state.config.currentHitComponent
})

const mapDispatchToProps = {setDisMaxQuery, setSelectedFilters, setStart}

export const ViewSwitcher: any = connect(mapStateToProps, mapDispatchToProps)(ViewSwitcherComponent)

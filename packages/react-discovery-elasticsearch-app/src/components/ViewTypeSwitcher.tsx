import {ESCore, Hits} from "@react-discovery/core"
import React, {ReactElement, Suspense} from "react"
import {getHitComponents, getViewType} from "@react-discovery/configuration"
import CircularProgress from '@material-ui/core/CircularProgress'
import {useFacetViewSwitcherStyles} from "@react-discovery/components"

const CUSTOM_COMPONENT_PATH = './hit-views/'

export const ViewTypeSwitcher: React.FC<any> = (props): ReactElement => {
  const classes: any = useFacetViewSwitcherStyles({})
  const filterType = ESCore.state.getFilterType() || 'Kulturobjekt'
  const hitComponents = getHitComponents()
  const viewType = getViewType()

  const buildHitComponent = (): ReactElement => {
    const [defaultHitComponent] = hitComponents.filter((hc): boolean => hc.defaultOption === true)
    const [gridComponent] = hitComponents.filter((hc): boolean => hc.type === 'grid')
    const [facetComponent] = hitComponents.filter((hc): boolean => hc.hitComponent === filterType && hc.expandedView === false)
    const [expandedFacetComponent] = hitComponents.filter((hc): boolean => hc.expandedView === true)
    const hitComponent = viewType === 'expanded' ? expandedFacetComponent
      : viewType === 'grid' ? gridComponent : facetComponent || defaultHitComponent
    const Component = React.lazy((): Promise<any> => hitComponent ?
      import(`${CUSTOM_COMPONENT_PATH}${hitComponent.hitComponent}`)
      : import(`${CUSTOM_COMPONENT_PATH}${defaultHitComponent.hitComponent}`))
    const options = {
      ...props,
      hitComponent: Component
    }
    return (<Hits {...options}/>)
  }

  return (
    <Suspense fallback={<CircularProgress className={classes.progress}/>}>{buildHitComponent()}</Suspense>
  )
}

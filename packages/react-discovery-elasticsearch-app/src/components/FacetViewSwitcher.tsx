import {ESCore, Hits} from "@react-discovery/core"
import React, {ReactElement, Suspense} from "react"
import {getHitComponents, getIsViewExpanded} from "@react-discovery/configuration"
import CircularProgress from '@material-ui/core/CircularProgress'
import {useFacetViewSwitcherStyles} from "@react-discovery/components"

const CUSTOM_COMPONENT_PATH = './hit-views/'
const FACET_KEY = 'facet'
const EXPANDED = 'Expanded'

export const FacetViewSwitcher: React.FC<any> = (props): ReactElement => {
  const classes: any = useFacetViewSwitcherStyles({})
  const filterType = ESCore.state.getFilterType() || 'Kulturobjekt'
  const hitComponents = getHitComponents()
  const isViewExpanded = getIsViewExpanded()

  const buildHitComponent = (): ReactElement => {
    const [defaultHitComponent] = hitComponents.filter((hc): boolean => hc.defaultOption === true)
    const [facetComponent] = hitComponents.filter((hc): boolean =>
      hc.key === FACET_KEY && hc.hitComponent === filterType && hc.expandedView === false)
    const [expandedFacetComponent] = hitComponents.filter((hc): boolean =>
      hc.key === FACET_KEY && hc.hitComponent === filterType + EXPANDED && hc.expandedView === true)
    const hitComponent = isViewExpanded ? expandedFacetComponent
      : facetComponent || defaultHitComponent
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

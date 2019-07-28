import React, {LazyExoticComponent, ReactElement} from 'react'

export type RenderFunction = (props?: any, children?: any) => Element
export type RenderComponentType<P> = React.ComponentClass<P> | React.ClassicComponentClass<P> | Element | RenderFunction | any

export const renderComponent = (component: RenderComponentType<any>, props, children?: any): ReactElement => {
  let isLazyReactComponent = component && (
    (component as LazyExoticComponent<any>).$$typeof !== undefined
  )
  if (isLazyReactComponent) {
    return React.createElement(
      component,
      ...props, children
    )
  }
  console.warn("Invalid component", component)
  return null
}

import React, {ReactElement} from 'react'

const omitBy = require("lodash/omitBy")
const isUndefined = require("lodash/isUndefined")

export type RenderFunction = (props?: any, children?: any) => Element
export type RenderComponentType<P> = React.ComponentClass<P> | React.ClassicComponentClass<P> | Element | RenderFunction | any

export const renderComponent = (component: RenderComponentType<any>, props, children?: any): ReactElement => {
  let isReactComponent = component && (
    typeof component === 'object' ||
    component["prototype"] instanceof React.Component ||
    (component["prototype"] && component["prototype"].isReactComponent) ||
    typeof component === 'function'
  )
  if (isReactComponent) {
    return React.createElement(
      component,
      props, children
    )
  } else if (React.isValidElement(component)) {
    return React.cloneElement(
      component as ReactElement,
      omitBy(props, isUndefined), children
    )
  }
  console.warn("Invalid component", component)
  return null
}

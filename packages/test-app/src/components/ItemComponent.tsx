import * as React from "react";
import {ReactElement} from "react"
import {connect} from "react-redux"
import {setStart} from "solr-react-faceted-search"

export interface ItemComponentProps {
  active: boolean
  count: number | string
  disabled: boolean
  itemKey?:string
  label: string
  onClick: Function
  showCheckbox: boolean
  showCount: boolean
}

function itemRenderer(props: ItemComponentProps) {
  const {
    onClick, active, disabled, itemKey,
    label, count, showCount, showCheckbox} = props

  const hasCount = showCount && (count !== undefined) && (count != null)
  return (
      <div data-qa="option" data-key={itemKey}>
        {showCheckbox ? <input type="checkbox" data-qa="checkbox" checked={active} readOnly/> : undefined}
        <div data-qa="label">{label}</div>
        {hasCount ? < div data-qa="count">{count}</div> : undefined}
      </div>
  )
}

interface IItemComponent extends ItemComponentProps {
  showCount: boolean
  showCheckbox: boolean
}
const ItemComponent: React.FC<IItemComponent> = (props): ReactElement => {
    return itemRenderer(props)
}

ItemComponent.defaultProps = {
  showCount: true,
  showCheckbox:false
}

const CheckBoxItemComponent: React.FC<IItemComponent> = (props): ReactElement => {
    return itemRenderer(props)
}

CheckBoxItemComponent.defaultProps = {
  showCount: true,
  showCheckbox:true
}

const mapStateToProps = (state): any => ({
  query: state.query,
  aggregations: state.response.aggregations
})

const mapDispatchToProps = {setStart}

export const CheckboxItem = connect(mapStateToProps, mapDispatchToProps)(CheckBoxItemComponent)

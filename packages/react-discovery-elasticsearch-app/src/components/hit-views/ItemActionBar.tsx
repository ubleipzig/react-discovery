import React, {ReactElement} from "react"
import {EntityBadges} from "."

export const ItemActionBar: React.FC<any> = (props): ReactElement => {
  const {entities, i, id} = props
  return entities ? (
    <div style={{background: '#f3f3f3', display: 'flex', flex: 1}}>
      <EntityBadges entities={entities} i={i} id={id}/>
    </div>
  ) : null
}

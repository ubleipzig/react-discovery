import React, {ReactElement} from "react"
import {EntityBadges} from "."

interface IItemActionBar {
  entities: any;
  i: number;
  id: string;
}

export const ItemActionBar: React.FC<IItemActionBar> = (props): ReactElement => {
  const {entities, i, id} = props
  return entities ? (
    <div style={{background: '#f3f3f3', display: 'flex', flex: 1}}>
      <EntityBadges entities={entities} i={i} id={id}/>
    </div>
  ) : null
}

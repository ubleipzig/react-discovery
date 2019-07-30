import React, {ReactElement} from "react"
import {Chip} from "@material-ui/core"
import {EntityBadges} from "./EntityBadges"
import {getSelectedIndex} from "@react-discovery/configuration"
import {useHitViewStyles} from "@react-discovery/views"

export const ItemActionBar: React.FC<any> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {entities, i, id} = props
  const indexMultiplier = getSelectedIndex()
  const chipLabel = (i + 1) + (20 * indexMultiplier)
  return entities ? (
    <div style={{background: '#f3f3f3', display: 'flex', flex: 1}}>
      <Chip
        className={classes.chip}
        color="secondary"
        label={chipLabel}
        size="small"
        variant="outlined"
      />
      <div style={{flex: 1, width: '100%'}}/>
      <EntityBadges entities={entities} id={id}/>
    </div>
  ) : null
}

import {Card, CardContent} from "@material-ui/core"
import {FieldLabel, RandomThumbnail, ValueDisplay, useHitViewStyles, } from '.'
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/solr"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: any;
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props

  return (
    <Card className={classes.root} key={i}>
      <RandomThumbnail/>
      <div className={classes.details}>
        {searchFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >
            <FieldLabel label={field.label}/>
            <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
          </CardContent>)}
      </div>
    </Card>
  )
}

export default DefaultHitComponent

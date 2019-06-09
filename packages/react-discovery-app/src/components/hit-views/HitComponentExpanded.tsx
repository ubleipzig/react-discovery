import {Card, CardContent} from "@material-ui/core"
import {FieldLabel, Thumbnail, ValueDisplay} from '..'
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles} from '.'

interface IExpandedHitComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const HitComponentExpanded: React.FC<IExpandedHitComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props

  return (
    <Card className={classes.root} key={i}>
      <Thumbnail image={buildRandomUBLThumbnail()}/>
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

export default HitComponentExpanded

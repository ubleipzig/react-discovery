import {Card, CardContent} from "@material-ui/core"
import {Domain, useHitViewStyles} from "@react-discovery/views"
import {ESCore, IHit} from "@react-discovery/core"
import {
  FieldValueDisplay,
  TitleIdHeader,
  buildHighlightedValueForHit,
  getFirstManifestFromHit
} from '@react-discovery/components'
import React, {ReactElement} from "react"
import {Thumbnail} from '@react-discovery/iiif'

interface IDefaultItemComponent {
  hit: IHit;
  i?: number;
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const title = buildHighlightedValueForHit('title', hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.DIGITALISAT)
  return (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id || hit.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail manifest={manifest}/>
        <div className={classes.details}>
          {searchFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >{hit._source && hit._source[field.field] ?
                <FieldValueDisplay field={field} hit={hit}/> : null}
            </CardContent>)}
        </div>
      </div>
    </Card>
  )
}

export default DefaultHitComponent

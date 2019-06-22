import {Card, CardContent} from "@material-ui/core"
import {FieldValueDisplay, Thumbnail, TitleIdHeader, buildHighlightedValueForHit} from '@react-discovery/components'
import {IHit, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles} from '.'

interface IDefaultItemComponent {
  hit: IHit;
  i: number;
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = SolrCore.state.getSearchFields()
  const {hit, i} = props
  const title = buildHighlightedValueForHit('titel_t', hit)

  return (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
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

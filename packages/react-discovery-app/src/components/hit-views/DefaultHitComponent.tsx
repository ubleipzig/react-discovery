import {Card, CardContent} from "@material-ui/core"
import {FieldLabel, Thumbnail, TitleIdHeader, ValueDisplay} from '..'
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles} from '.'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const title = buildHighlightedValueForHit('titel_t', hit)

  const buildFieldValueDisplay = (field): ReactElement => {
    return (
      <>
        <FieldLabel label={field.label}/>
        <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
      </>)
  }

  return (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={null}
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
                buildFieldValueDisplay(field) : null}
            </CardContent>)}
        </div>
      </div>
    </Card>
  )
}

export default DefaultHitComponent

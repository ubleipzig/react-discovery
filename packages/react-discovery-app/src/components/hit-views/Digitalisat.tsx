import {Card, CardContent} from "@material-ui/core"
import {Domain, useHitViewStyles} from '.'
import {FieldValueDisplay, RelatedItems, Thumbnail, TitleIdHeader} from '..'
import {IHit, getSearchFields} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"

interface IDigitalisat {
  hit: IHit;
  i?: number;
}

const Digitalisat: React.FC<IDigitalisat> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = getSearchFields()
  const {hit, i} = props
  const filteredFields = ['digitalisatDescription', 'manifest']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('digitalisatTitel_t', hit)

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.contentNoFlex}
              key={key}
            >{hit._source && hit._source[field.field] ?
                <FieldValueDisplay field={field} hit={hit}/> : null}
            </CardContent>)}
        </div>
      </div>
      <RelatedItems
        id={hit._source._root_}
        primaryDocFilter={Domain.KULTUROBJEKT}
      />
    </Card>
  ) : null
}

export default Digitalisat

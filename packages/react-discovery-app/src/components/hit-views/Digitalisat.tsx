import {Card, CardContent} from "@material-ui/core"
import {FieldValueDisplay, RelatedItems, Thumbnail, TitleIdHeader} from '..'
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles, } from '.'

interface IDigitalisat {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const Digitalisat: React.FC<IDigitalisat> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
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
        primaryDocFilter='Kulturobjekt'
      />
    </Card>
  ) : null
}

export default Digitalisat

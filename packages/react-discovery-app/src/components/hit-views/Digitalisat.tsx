import {Card, CardContent} from "@material-ui/core"
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {RelatedItems, Thumbnail, TitleIdHeader, ValueDisplay} from '..'
import {buildRandomUBLThumbnail} from "../../utils"
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
  const filteredFields = ['DigitalisatDescription', 'Manifest']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={hit._source.titel_t}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.contentNoFlex}
              key={key}
            >
              <ValueDisplay
                field={field.field}
                hit={hit}
                style={{flex: '1 0'}}
              />
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

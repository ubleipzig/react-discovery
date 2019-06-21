import {Card, CardContent} from "@material-ui/core"
import {Domain, useHitViewStyles} from '.'
import {
  FieldValueDisplay,
  RelatedItems,
  Thumbnail,
  TitleIdHeader,
  buildHighlightedValueForHit
} from '@react-discovery/components'
import {IHit, getSearchFields} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {buildRandomUBLThumbnail} from "../../utils"

interface IPerson {
  hit: IHit;
  i?: number;
}

const filteredFields = ['personBirthDate', 'personDeathDate', 'personBirthPlace',
  'personDeathPlace', 'personWorkingPlace', 'personOccupation', 'personRole', 'personGender', 'personAlternateNames']

const Person: React.FC<IPerson> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = getSearchFields()
  const {hit, i} = props
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('personFullname_t', hit)

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
              className={classes.content}
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

export default Person

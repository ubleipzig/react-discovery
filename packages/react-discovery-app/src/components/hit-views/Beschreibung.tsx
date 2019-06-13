import {Card, CardActions, CardContent} from "@material-ui/core"
import {Domain, useHitViewStyles} from '.'
import {FieldValueDisplay, RelatedItems, Thumbnail, TitleIdHeader, facetDisplayFields} from '..'
import {IHit, getSearchFields} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {EntityDisplay} from "./EntityDisplay"
import {buildRandomUBLThumbnail} from "../../utils"

interface IDescriptionHitComponent {
  hit: IHit;
  i?: number;
}

const Beschreibung: React.FC<IDescriptionHitComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = getSearchFields()
  const {hit, i} = props
  const displayFields = searchFields.filter((sf): boolean => sf.field === 'beschreibungTitle_t')

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={hit._source.beschreibungTitle_t}
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
          <CardActions disableSpacing>
            <EntityDisplay displayFields={facetDisplayFields} hit={hit} type={Domain.FASZIKEL}/>
          </CardActions>
        </div>
      </div>
      <RelatedItems
        id={hit._source._root_}
        primaryDocFilter={Domain.KULTUROBJEKT}
      />
    </Card>
  ) : null
}

export default Beschreibung

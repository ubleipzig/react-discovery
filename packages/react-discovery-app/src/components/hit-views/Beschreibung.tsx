import {
  Card, CardActions,
  CardContent,
} from "@material-ui/core"
import {
  FieldLabel,
  RelatedItems,
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  facetDisplayFields
} from '..'
import {IHit, ISearchField} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {EntityDisplay} from "./EntityDisplay"
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles, } from '.'

interface IDescriptionHitComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const Beschreibung: React.FC<IDescriptionHitComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const displayFields = searchFields.filter((sf): boolean => sf.field === 'beschreibungTitle_t')

  const buildFieldValueDisplay = (field): ReactElement => {
    return (
      <>
        <FieldLabel label={field.label}/>
        <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
      </>)
  }

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
                buildFieldValueDisplay(field) : null}
            </CardContent>)}
          <CardActions disableSpacing>
            <EntityDisplay displayFields={facetDisplayFields} hit={hit} type='Faszikel'/>
          </CardActions>
        </div>
      </div>
      <RelatedItems
        id={hit._source._root_}
        primaryDocFilter='Kulturobjekt'
      />
    </Card>
  ) : null
}

export default Beschreibung

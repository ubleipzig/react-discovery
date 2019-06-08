import {Card, CardContent} from "@material-ui/core"
import React, {ReactElement} from "react"
import {RelatedItems, Thumbnail, TitleIdHeader, ValueDisplay} from '..'
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles, } from '.'

interface IDescriptionHitComponent {
  classes: any;
  hit: {
    _source: any;
    highlighting: any;
  };
  i: number;
  searchFields: any;
}

const Beschreibung: React.FC<IDescriptionHitComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const displayFields = searchFields.filter((sf): boolean => sf.field === 'beschreibungText_t')

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
              className={classes.content}
              key={key}
            >
              <ValueDisplay
                field={field.field}
                hit={hit}
                style={{flex: 'auto'}}
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

export default Beschreibung

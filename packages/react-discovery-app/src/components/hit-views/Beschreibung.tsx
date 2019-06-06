import {Card, CardContent, makeStyles} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, useHitViewStyles, ValueDisplay} from '.'
import React, {ReactElement} from "react"

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
        <RandomThumbnail/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <ValueDisplay field={field.field} hit={hit} style={{flex: 'auto'}}/>
            </CardContent>)}
        </div>
      </div>
    </Card>
  ) : null
}

export default Beschreibung

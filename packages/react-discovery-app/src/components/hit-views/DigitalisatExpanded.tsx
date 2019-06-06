import {Card, CardContent} from "@material-ui/core"
import {RandomThumbnail, TitleIdHeader, ValueDisplay, useHitViewStyles, } from '.'
import React, {ReactElement} from "react"

interface IDigitalisat {
  classes: any;
  hit: {
    _source: any;
    highlighting: any;
  };
  i: number;
  searchFields: any;
}

const DigitalisatExpanded: React.FC<IDigitalisat> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const filteredFields = ['DigitalisatDescription', 'Manifest']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title='Expanded Images View'
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
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
    </Card>
  ) : null
}

export default DigitalisatExpanded

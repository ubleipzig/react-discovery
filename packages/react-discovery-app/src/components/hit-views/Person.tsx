import {Card, CardContent} from "@material-ui/core"
import {FieldLabel, RandomThumbnail, TitleIdHeader, ValueDisplay, useHitViewStyles, } from '.'
import React, {ReactElement} from "react"
import {buildHighlightedValueForHit} from "../../utils"

interface IPerson {
  classes: any;
  hit: {
    _source: any;
    highlighting: any;
  };
  i: number;
  searchFields: any;
}

const Person: React.FC<IPerson> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const filteredFields = ['personBirthDate', 'personDeathDate', 'personBirthPlace',
    'personDeathPlace', 'personWorkingPlace', 'personOccupation']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('personFullname_t', hit)

  return hit ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          {displayFields.map((field, key): ReactElement =>
            <CardContent
              className={classes.content}
              key={key}
            >
              <FieldLabel label={field.label}/>
              <ValueDisplay
                field={field.field}
                hit={hit}
                style={{flex: 'auto'}}
              />
            </CardContent>)}
        </div>
      </div>
    </Card>
  ) : null
}

export default Person
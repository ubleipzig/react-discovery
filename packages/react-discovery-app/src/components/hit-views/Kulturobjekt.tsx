import {Book, Image} from '@material-ui/icons'
import {Card, CardActions, CardContent, Typography} from "@material-ui/core"
import {IHit, ISearchField, getFilterType} from "@react-discovery/solr"
import {RandomThumbnail, TitleIdHeader, ValueDisplay, useHitViewStyles} from '.'
import React, {Fragment, ReactElement} from "react"
import {buildEntityCountForType, buildHighlightedValueForHit} from "../../utils"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
  searchFields: ISearchField[];
}

const DIGITALISAT = 'Digitalisat'
const BESCHREIBUNG = 'Beschreibung'

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit, i, searchFields} = props
  const title = buildHighlightedValueForHit('titel_t', hit)
  const filteredFields = ['material', 'format', 'originPlace', 'originDate']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const filterType = getFilterType()

  const buildFieldSeparator = (): string => {
    return '\u00A0\u2223\u00A0'
  }

  const buildValueDisplay = (field: string, hit: IHit, key: number): ReactElement => {
    return (<Fragment key={key}>
      <ValueDisplay field={field} hit={hit} style={{flex: 'auto'}} variant='body2'/>
      {buildFieldSeparator()}
    </Fragment>)
  }

  return hit && filterType === 'Kulturobjekt' ? (
    <Card className={classes.root} key={i}>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <RandomThumbnail/>
        <div className={classes.details}>
          <CardContent
            className={classes.content}
          >
            <ValueDisplay
              field={'subtitel_t'}
              hit={hit}
              style={{flex: 'auto'}}
              variant='h6'
            />
          </CardContent>
          <CardContent className={classes.content}>
            {displayFields.map((field, key): ReactElement =>
              buildValueDisplay(field.field, hit, key))}
          </CardContent>
          <CardActions disableSpacing>
            <Image fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {DIGITALISAT} <i>({buildEntityCountForType(hit, DIGITALISAT)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {BESCHREIBUNG} <i>({buildEntityCountForType(hit, BESCHREIBUNG)})</i>
            </Typography>
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default Kulturobjekt

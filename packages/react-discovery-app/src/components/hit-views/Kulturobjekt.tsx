import {Book, Image} from '@material-ui/icons'
import {Card, CardActions, CardContent, Typography} from "@material-ui/core"
import {IHit, ISearchField, getFilterType} from "@react-discovery/solr"
import React, {ReactElement} from "react"
import {Thumbnail, TitleIdHeader, ValueDisplay} from '..'
import {buildEntityCountForType, buildHighlightedValueForHit, buildRandomUBLThumbnail} from "../../utils"
import {ViewSwitcherToggle} from "../ViewSwitcherToggle"
import {useHitViewStyles} from '.'
import {useTranslation} from "react-i18next"

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
  const {t} = useTranslation('vocab')

  const buildValueDisplay = (field: string, hit: IHit, key: number): ReactElement => {
    return (
      <ValueDisplay
        field={field}
        hit={hit}
        key={key}
        separator={true}
        style={{flex: 'auto'}}
        variant='body2'
      />
    )
  }

  return hit && filterType === 'Kulturobjekt' ? (
    <Card className={classes.root} key={i}>
      <ViewSwitcherToggle/>
      <TitleIdHeader
        id={hit._source.id}
        title={title}
      />
      <div style={{display: 'flex'}}>
        <Thumbnail image={buildRandomUBLThumbnail()}/>
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
              {t(DIGITALISAT)} <i>({buildEntityCountForType(hit, DIGITALISAT)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {t(BESCHREIBUNG)} <i>({buildEntityCountForType(hit, BESCHREIBUNG)})</i>
            </Typography>
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default Kulturobjekt

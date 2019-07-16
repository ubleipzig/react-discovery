import {Book, ChatBubble, Image, Person} from '@material-ui/icons'
import {Card, CardActions, CardContent, Typography} from "@material-ui/core"
import {IHit, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {
  Thumbnail,
  TitleIdHeader,
  ValueDisplay,
  ViewSwitcherToggle,
  buildEntityCountForType,
  buildHighlightedValueForHit
} from '@react-discovery/components'
import {Domain} from "../../enum"
import {buildRandomUBLThumbnail} from "../../utils"
import {useHitViewStyles} from '.'
import {useTranslation} from "react-i18next"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = SolrCore.state.getSearchFields()
  const {hit, i} = props
  const title = buildHighlightedValueForHit('titel_t', hit)
  const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const filterType = SolrCore.state.getFilterType()
  const {t} = useTranslation('vocab')
  const entities = hit && hit._source.entities && hit._source.entities
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

  return hit ? (
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
              {t(Domain.DIGITALISAT)} <i>({buildEntityCountForType(entities, Domain.DIGITALISAT)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <Book fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {t(Domain.BESCHREIBUNG)} <i>({buildEntityCountForType(entities, Domain.BESCHREIBUNG)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <Person fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {t(Domain.PERSON)} <i>({buildEntityCountForType(entities, Domain.PERSON)})</i>
            </Typography>
          </CardActions>
          <CardActions disableSpacing>
            <ChatBubble fontSize='small' htmlColor='#86173e' style={{padding: '5px'}}/>
            <Typography
              className={classes.heading}
              variant='body2'
            >
              {t(Domain.ANNOTATION)} <i>({buildEntityCountForType(entities, Domain.ANNOTATION)})</i>
            </Typography>
          </CardActions>
        </div>
      </div>
    </Card>
  ) : null
}

export default Kulturobjekt

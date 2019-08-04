import {Card, CardActions, CardContent, Grid} from "@material-ui/core"
import {
  Domain,
  EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  facetDisplayFields,
  personDisplayFields,
  useHitViewStyles
} from "@react-discovery/views"
import {ESCore, IHit} from "@react-discovery/core"
import {
  FieldValueDisplay,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
  getFirstManifestFromHit,
} from '@react-discovery/components'
import {HitViewOptionsMenu, ItemActionBar, ThumbnailGrid} from "."
import React, {ReactElement} from "react"
import {getHitComponentConfig, getIsViewExpanded, getItemViewType} from "@react-discovery/configuration"
import Kulturobjekt from './Kulturobjekt'
import {MediaGrid} from '..'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && hit._source.id
  const itemViewType = hit && getItemViewType(id)
  const isViewExpanded = getIsViewExpanded()
  const entities = hit && hit._source.entities && hit._source.entities
  const componentConfig = getHitComponentConfig('KulturobjektExpanded')
  const filteredFields = componentConfig && componentConfig.filteredFields
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.DIGITALISAT)
  const media = hit && hit._source && hit._source.entities
    .filter((entity) => entity[typeField] === Domain.DIGITALISAT)
  const item = media.length && media[0]

  const cardActions = [
    {
      displayFields: beschreibungDisplayFields,
      isNested: true,
      nestedDisplayFields: facetDisplayFields,
      type: Domain.BESCHREIBUNG
    },
    {
      displayFields: personDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.PERSON
    },
    {
      displayFields: annotationDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.ANNOTATION
    },
  ]

  const buildCardActions = (cardActions): ReactElement[] => {
    return cardActions.map((item, i): ReactElement =>
      <CardActions
        disableSpacing
        key={i}
      >
        <EntityDisplay
          displayFields={item.displayFields}
          hit={hit}
          isNested={item.isNested}
          nestedDisplayFields={item.nestedDisplayFields}
          type={item.type}
          useExpansion={false}
        />
      </CardActions>
    )
  }
  const optionsMenu = <HitViewOptionsMenu id={id}/>

  return hit && (itemViewType === 'info' || isViewExpanded) ? (
    <Card className={classes.root} key={i}>
      <Grid
        container
        justify="space-between"
      >
        <Grid
          item
          xs={8}
        >
          <ItemActionBar entities={entities} i={i} id={id}/>
          <TitleIdHeader
            id={id}
            optionsMenu={optionsMenu}
            title={title}
          />
          <div className={classes.details}>
            <ValueDisplay
              field={Domain.DOC_SUBTITLE_FIELD}
              hit={hit}
              style={{display: 'flex', padding: '10px'}}
              variant='h6'
            />
            {displayFields.map((field, key): ReactElement =>
              <CardContent
                className={classes.content}
                key={key}
              >{hit._source && hit._source[field.field] ?
                  <FieldValueDisplay field={field} hit={hit}/> : null}
              </CardContent>)}
          </div>
          <MediaGrid hit={hit}/>
          {buildCardActions(cardActions)}
        </Grid>
        <ThumbnailGrid hit={hit} item={item} manifest={manifest}/>
      </Grid>
    </Card>
  ) : <Kulturobjekt {...props}/>
}

export default KulturobjektExpanded

import {Card, CardActions, CardContent, Grid} from "@material-ui/core"
import {
  Domain,
  EntityDisplay,
  HitViewOptionsMenu,
  domainEntitySpec,
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
import {ItemActionBar, ThumbnailGrid} from "."
import React, {ReactElement} from "react"
import {getHitComponentConfig, getItemViewType, getViewType} from "@react-discovery/configuration"
import {getNumberOfWorkspaceNodesForId, setViewIdMap} from '@react-discovery/workspace'
import Kulturobjekt from './Kulturobjekt'
import {MediaGrid} from '..'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const optionsMenuActions = {
    getNumberOfWorkspaceNodesForId, setViewIdMap
  }
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && hit._source.id
  const itemViewType = hit && getItemViewType(id)
  const viewType = getViewType()
  const entities = hit && hit._source.entities && hit._source.entities
  const componentConfig = getHitComponentConfig('KulturobjektExpanded')
  const filteredFields = componentConfig && componentConfig.filteredFields
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.MEDIA)
  const media = entities && entities.filter((entity): boolean => entity[typeField] === Domain.MEDIA)
  const item = media && media.length && media[0]

  const buildCardActions = (domainEntitySpec): ReactElement[] => {
    return domainEntitySpec.map((item, i): ReactElement =>
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
  const optionsMenu = <HitViewOptionsMenu actions={optionsMenuActions} id={id}/>

  return hit && (itemViewType === 'info' || viewType === 'expanded') ? (
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
          {buildCardActions(domainEntitySpec)}
        </Grid>
        <ThumbnailGrid hit={hit} id={id} item={item} manifest={manifest}/>
      </Grid>
    </Card>
  ) : <Kulturobjekt {...props}/>
}

export default KulturobjektExpanded

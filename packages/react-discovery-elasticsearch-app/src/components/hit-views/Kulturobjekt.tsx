import {Annotations, Descriptions, Digitalisate, HitAbstract, Info, ItemActionBar, ThumbnailGrid} from '.'
import {Card, CardContent, Divider, Grid} from "@material-ui/core"
import {Domain, HitViewOptionsMenu, useHitViewStyles} from '@react-discovery/views'
import {ESCore, IHit} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
  getFirstManifestFromHit
} from '@react-discovery/components'
import {getHitComponentConfig, getItemViewType, getViewType} from "@react-discovery/configuration"
import {getNumberOfWorkspaceNodesForId, setViewIdMap} from '@react-discovery/workspace'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const typeField = ESCore.enums.FieldConstants.TYPE_FIELD

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const optionsMenuActions = {
    getNumberOfWorkspaceNodesForId, setViewIdMap
  }
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && hit._source.id
  const itemViewType = hit && getItemViewType(id)
  const viewType = getViewType()
  const title = buildHighlightedValueForHit(Domain.DOC_TITLE_FIELD, hit)
  const componentConfig = getHitComponentConfig(Domain.KULTUROBJEKT)
  const filteredFields = componentConfig && componentConfig.filteredFields
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const entities = hit && hit._source.entities && hit._source.entities
  const manifest = hit && getFirstManifestFromHit(hit, Domain.MEDIA)
  const media = entities && entities.filter((entity): boolean => entity[typeField] === Domain.MEDIA)
  const item = media && media.length && media[0]

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

  const defaultDisplay = (): ReactElement => {
    return (
      <CardContent className={classes.content}>
        {displayFields.map((field, key): ReactElement =>
          buildValueDisplay(field.field, hit, key))}
      </CardContent>
    )
  }
  const buildItemViewForType = (itemViewType): ReactElement => {
    switch (itemViewType) {
      case 'index':
        return defaultDisplay()
      case 'info':
        return <Info {...props}/>
      case Domain.MEDIA:
        return <Digitalisate {...props}/>
      case Domain.DESCRIPTION:
        return <Descriptions {...props}/>
      case Domain.ANNOTATION:
        return <Annotations {...props}/>
      default:
        return defaultDisplay()
    }
  }
  const optionsMenu = id && <HitViewOptionsMenu actions={optionsMenuActions} id={id}/>

  return hit && viewType !== 'expanded' ? (
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
          <div style={{display: 'flex'}}>
            <div className={classes.details}>
              <CardContent
                className={classes.content}
              >
                <ValueDisplay
                  field={Domain.DOC_SUBTITLE_FIELD}
                  hit={hit}
                  style={{flex: 'auto'}}
                  variant='h6'
                />
              </CardContent>
              <Divider style={{margin: 12}} variant="middle"/>
              {buildItemViewForType(itemViewType)}
              <HitAbstract hit={hit}/>
            </div>
          </div>
        </Grid>
        <ThumbnailGrid hit={hit} id={id} item={item} manifest={manifest}/>
      </Grid>
    </Card>
  ) : null
}

export default Kulturobjekt

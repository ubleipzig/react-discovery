import {Annotations, Descriptions, Digitalisate, ExpandedInfo, HitAbstract, ItemActionBar} from '.'
import {Card, CardContent, Divider, Grid} from "@material-ui/core"
import {Domain, ThumbnailGrid, useHitViewStyles} from '@react-discovery/views'
import {ESCore, IHit} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
  getFirstManifestFromHit
} from '@react-discovery/components'
import {getIsViewExpanded, getItemViewType} from "@react-discovery/configuration"
import {HitViewOptionsMenu} from '..'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && hit._source.id
  const itemViewType = hit && getItemViewType(id)
  const isViewExpanded = getIsViewExpanded()
  const title = buildHighlightedValueForHit('titel_t', hit)
  const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const entities = hit && hit._source.entities && hit._source.entities
  const manifest = hit && getFirstManifestFromHit(hit, Domain.DIGITALISAT)

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

  const defaultDisplay = () => {
    return (
      <CardContent className={classes.content}>
        {displayFields.map((field, key): ReactElement =>
          buildValueDisplay(field.field, hit, key))}
      </CardContent>
    )
  }
  const buildItemViewForType = (itemViewType) => {
    switch (itemViewType) {
      case 'info':
        return <ExpandedInfo {...props}/>
      case Domain.DIGITALISAT:
        return <Digitalisate {...props}/>
      case Domain.BESCHREIBUNG:
        return <Descriptions {...props}/>
      case Domain.ANNOTATION:
        return <Annotations {...props}/>
      default:
        return defaultDisplay()
    }
  }

  return hit && !isViewExpanded ? (
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
            id={hit._source.id}
            title={title}
          />
          <div style={{display: 'flex'}}>
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
              <Divider style={{margin: 12}} variant="middle"/>
              {buildItemViewForType(itemViewType)}
              <HitAbstract hit={hit}/>
            </div>
          </div>
        </Grid>
        <ThumbnailGrid manifest={manifest}/>
        <Grid item style={{margin: 12}}>
          <HitViewOptionsMenu id={id}/>
        </Grid>
      </Grid>
    </Card>
  ) : null
}

export default Kulturobjekt

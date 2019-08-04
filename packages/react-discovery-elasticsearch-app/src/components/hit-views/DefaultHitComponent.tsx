import {Card, CardContent, Grid} from "@material-ui/core"
import {Domain, useHitViewStyles} from "@react-discovery/views"
import {ESCore, IHit} from "@react-discovery/core"
import {
  FieldValueDisplay,
  TitleIdHeader,
  buildHighlightedValueForHit,
  getFirstManifestFromHit
} from '@react-discovery/components'
import React, {ReactElement} from "react"
import {HitViewOptionsMenu} from "./HitViewOptionsMenu"
import {ThumbnailGrid} from "./ThumbnailGrid"

interface IDefaultItemComponent {
  hit: IHit;
  i?: number;
}

const DefaultHitComponent: React.FC<IDefaultItemComponent> = (props: IDefaultItemComponent): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && (hit._source.id || hit.id)
  const title = buildHighlightedValueForHit('title', hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.DIGITALISAT)
  const optionsMenu = id && <HitViewOptionsMenu id={id}/>
  const item = {
    [Domain.MEDIA_TITLE_FIELD]: title,
    [Domain.MANIFEST_ID_FIELD]: manifest,
  }
  return (
    <Card className={classes.root} key={i}>
      <Grid
        container
        justify="space-between"
      >
        <Grid
          item
          style={{marginTop: 10}}
          xs={8}
        >
          <TitleIdHeader
            id={id}
            optionsMenu={optionsMenu}
            title={title}
          />
          <div style={{display: 'flex'}}>
            <div className={classes.details}>
              {searchFields.map((field, key): ReactElement =>
                <CardContent
                  className={classes.content}
                  key={key}
                >{hit._source && hit._source[field.field] ?
                    <FieldValueDisplay field={field} hit={hit}/> : null}
                </CardContent>)}
            </div>
          </div>
        </Grid>
        <ThumbnailGrid hit={hit} item={item} manifest={manifest}/>
      </Grid>
    </Card>
  )
}

export default DefaultHitComponent

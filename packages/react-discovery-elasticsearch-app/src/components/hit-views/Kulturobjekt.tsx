import {Card, CardContent, Grid, makeStyles} from "@material-ui/core"
import {IHit, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {ThumbnailGrid, useHitViewStyles} from '.'
import {TitleIdHeader, ValueDisplay, ViewSwitcherToggle, buildHighlightedValueForHit} from '@react-discovery/components'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

export const useThumbnailStyles = makeStyles((): any => ({
  cover: {
    flexShrink: 0,
    padding: 20,
  },
}))

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = SolrCore.state.getSearchFields()
  const {hit, i} = props
  const title = buildHighlightedValueForHit('titel_t', hit)
  const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate']
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
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
      <Grid container>
        <Grid
          item xs={8}
        >
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
              <CardContent className={classes.content}>
                {displayFields.map((field, key): ReactElement =>
                  buildValueDisplay(field.field, hit, key))}
              </CardContent>
            </div>
          </div>
        </Grid>
        <ThumbnailGrid entities={entities}/>
      </Grid>
      <ViewSwitcherToggle/>
    </Card>
  ) : null
}

export default Kulturobjekt

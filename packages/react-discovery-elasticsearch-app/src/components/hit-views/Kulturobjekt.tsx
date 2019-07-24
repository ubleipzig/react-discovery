import {Card, CardContent, Divider, Grid, List, ListItem, ListSubheader, Typography} from "@material-ui/core"
import {ESCore, IHit} from "@react-discovery/core"
import {
  ExpandItemToggle,
  FieldLabel,
  InnerHtmlValue,
  TitleIdHeader,
  ValueDisplay,
  buildHighlightedValueForHit,
} from '@react-discovery/components'
import React, {ReactElement} from "react"
import {ThumbnailGrid, useHitViewStyles} from '@react-discovery/views'
import {getIsItemExpanded, getIsViewExpanded} from "@react-discovery/configuration"
import KulturobjektExpanded from './KulturobjektExpanded'

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

const Kulturobjekt: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const isItemExpanded = hit && getIsItemExpanded(hit._source.id)
  const isViewExpanded = getIsViewExpanded()
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

  const buildFieldValueHits = (values) => {
    return values.map((v, i) => {
      return (
        <ListItem
          key={i}
        >
          <Typography
            className={classes.inline}
            color="textSecondary"
            component="span"

          >
            <InnerHtmlValue key={i} value={v}/>
            <Divider/>
          </Typography>
        </ListItem>
      )
    })
  }

  const buildNestedHighlights = (hit: IHit): any => {
    const highlights: any[] = hit && hit.highlighting
    return Object.entries(highlights).map(([ field, values]: any, i) => {
      const normalizedField = field.split('.').pop()
      return (
        <ListItem
          component='div'
          key={i}>
          <FieldLabel
            label={normalizedField}
          />
          {buildFieldValueHits(values)}
        </ListItem>
      )
    })
  }

  return hit && (!isItemExpanded && !isViewExpanded) ? (
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
              <Divider style={{marginTop: 16}} variant="middle"/>
              {Object.keys(hit.highlighting).length ?
                <List
                  dense={true}
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Hit Detail
                    </ListSubheader>
                  }
                >
                  {buildNestedHighlights(hit)}
                </List> : null
              }
            </div>
          </div>
        </Grid>
        <ThumbnailGrid entities={entities}/>
      </Grid>
      {!isViewExpanded ? <ExpandItemToggle id={hit._source.id}/> : null}
    </Card>
  ) : <KulturobjektExpanded {...props}/>
}

export default Kulturobjekt

import {Divider, List, ListItem, ListSubheader, Typography} from "@material-ui/core"
import {FieldLabel, InnerHtmlValue} from "@react-discovery/components"
import React, {ReactElement} from "react"
import {IHit} from "@react-discovery/core"
import {useHitViewStyles} from "@react-discovery/views"

export const HitAbstract: React.FC<any> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const {hit} = props
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

  return (
    <>
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
      </>
  )
}

import {Card, CardActions, CardContent, Grid} from "@material-ui/core"
import {
  Domain,
  EntityDisplay,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields,
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
import {getIsViewExpanded, getItemViewType} from "@react-discovery/configuration"
import Kulturobjekt from './Kulturobjekt'
import {getNumberOfWorkspaceNodesForId} from "@react-discovery/workspace"

interface IDefaultItemComponent {
  classes: any;
  hit: IHit;
  i: number;
}

// TODO add this to configuration
const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = ESCore.state.getSearchFields()
  const {hit, i} = props
  const id = hit && hit._source.id
  const nodeCount = getNumberOfWorkspaceNodesForId(id)
  const itemViewType = hit && getItemViewType(id)
  const isViewExpanded = getIsViewExpanded()
  const entities = hit && hit._source.entities && hit._source.entities
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('titel_t', hit)
  const manifest = hit && getFirstManifestFromHit(hit, Domain.DIGITALISAT)
  const cardActions = [
    {
      displayFields: digitalisatDisplayFields,
      isNested: false,
      nestedDisplayFields: null,
      type: Domain.DIGITALISAT
    },
    {
      displayFields: beschreibungDisplayFields,
      isNested: true,
      nestedDisplayFields: facetDisplayFields,
      type: Domain.BESCHREIBUNG
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
        />
      </CardActions>
    )
  }

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
            id={hit._source.id}
            nodeCount={nodeCount}
            title={title}
          />
          <div className={classes.details}>
            <ValueDisplay
              field={'subtitel_t'}
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
          {buildCardActions(cardActions)}
        </Grid>
        <ThumbnailGrid id={id} manifest={manifest}/>
      </Grid>
    </Card>
  ) : <Kulturobjekt {...props}/>
}

export default KulturobjektExpanded

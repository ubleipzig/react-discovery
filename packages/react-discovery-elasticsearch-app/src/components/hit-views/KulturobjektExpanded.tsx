import {Card, CardActions, CardContent, Grid, makeStyles} from "@material-ui/core"
import {
  EntityDisplay,
  ThumbnailGrid,
  annotationDisplayFields,
  beschreibungDisplayFields,
  digitalisatDisplayFields,
  facetDisplayFields,
  useHitViewStyles
} from '.'
import {
  FieldValueDisplay,
  TitleIdHeader,
  ValueDisplay,
  ViewSwitcherToggle,
  buildHighlightedValueForHit
} from '@react-discovery/components'
import {IHit, SolrCore} from "@react-discovery/core"
import React, {ReactElement} from "react"
import {Domain} from "../../enum"
import {useTranslation} from "react-i18next"

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

// TODO add this to configuration
const filteredFields = ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
  'status', 'writingStyle', 'language', 'previousOwner']

const KulturobjektExpanded: React.FC<IDefaultItemComponent> = (props): ReactElement => {
  const classes: any = useHitViewStyles({})
  const searchFields = SolrCore.state.getSearchFields()
  const {hit, i} = props
  const entities = hit && hit._source.entities && hit._source.entities
  const displayFields = searchFields.filter((sf): boolean => filteredFields.includes(sf.label))
  const title = buildHighlightedValueForHit('titel_t', hit)

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
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={digitalisatDisplayFields}
                hit={hit}
                type={Domain.DIGITALISAT}
              />
            </CardActions>
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={beschreibungDisplayFields}
                hit={hit}
                isNested={true}
                nestedDisplayFields={facetDisplayFields}
                type={Domain.BESCHREIBUNG}
              />
            </CardActions>
            <CardActions disableSpacing>
              <EntityDisplay
                displayFields={annotationDisplayFields}
                hit={hit}
                type={Domain.ANNOTATION}
              />
            </CardActions>
          </div>
        </Grid>
        <ThumbnailGrid entities={entities}/>
      </Grid>
      <ViewSwitcherToggle/>
    </Card>
  ) : null
}

export default KulturobjektExpanded

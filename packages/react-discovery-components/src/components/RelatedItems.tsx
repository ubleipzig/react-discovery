import {Link, useCurrentRoute} from "react-navi"
import React, {ReactElement} from "react"
import {Button} from "@material-ui/core"
import MuiLink from '@material-ui/icons/Link';
import {SolrCore} from "@react-discovery/core"
import clsx from 'clsx';
import {useDispatch} from "react-redux"
import {useRelatedItemsStyles} from "../styles"
import {useTranslation} from "react-i18next"

interface IRelatedItems {
  id: string;
  primaryDocFilter: string;
}

export const RelatedItems: React.FC<IRelatedItems> = (props): ReactElement => {
  const dispatch = useDispatch()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const classes: any = useRelatedItemsStyles({});
  const {id, primaryDocFilter} = props
  const filters = primaryDocFilter ? [primaryDocFilter] : []
  const {t} = useTranslation('vocab')

  const handleChange = (): void => {
    dispatch(SolrCore.state.setQueryInput({stringInput: id}))
    dispatch(SolrCore.state.setSelectedFilters({field: 'type_s', filters}))
    dispatch(SolrCore.state.setStart({start: 0}))
    dispatch(SolrCore.state.setGroupField({groupField: ''}))
    dispatch(SolrCore.state.setTypeDef({typeDef: SolrCore.enums.SolrParameters.LUCENE}))
  }

  const handleContextReset = (): void => {
    dispatch(SolrCore.state.setQueryInput({stringInput: id}))
    dispatch(SolrCore.state.setSelectedFilters({field: 'type_s', filters: []}))
    dispatch(SolrCore.state.setStart({start: 0}))
    dispatch(SolrCore.state.setGroupField({groupField: ''}))
  }

  const buildRelatedItemsForPathName = (): ReactElement => {
    if (pathname === '/') {
      return (
        <Button
          className={classes.button}
          data-testid='relations'
          href=''
          onClick={handleChange}
          size="small"
          variant="contained"
        >
          <MuiLink className={clsx(classes.leftIcon, classes.iconSmall)} />
          {t('relations')}
        </Button>
      )
    } else {
      return (
        <Link
          href={`/?q=${id}`}>
          <Button
            className={classes.button}
            data-testid='detail-relations'
            href=''
            onClick={handleContextReset}
            size="small"
            variant="contained"
          >
            {t('relations')}
          </Button>
        </Link>
      )
    }
  }

  return buildRelatedItemsForPathName()
}

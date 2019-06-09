import {Button, Theme, createStyles, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {
  SolrParameters,
  setGroupField,
  setQueryInput,
  setSelectedFilters,
  setStart,
  setTypeDef
} from "@react-discovery/solr"
import Link from '@material-ui/icons/Link';
import clsx from 'clsx';
import {useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"

interface IRelatedItems {
  id: string;
  primaryDocFilter: string;
}

const useStyles = makeStyles((theme: Theme): any =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export const RelatedItems: React.FC<IRelatedItems> = (props): ReactElement => {
  const dispatch = useDispatch()
  const classes: any = useStyles({});
  const {id, primaryDocFilter} = props
  const filters = primaryDocFilter ? [primaryDocFilter] : []
  const {t} = useTranslation('vocab')

  const handleChange = (): void => {
    dispatch(setQueryInput({stringInput: id}))
    dispatch(setSelectedFilters({field: 'type_s', filters}))
    dispatch(setStart({start: 0}))
    dispatch(setGroupField({groupField: ''}))
    dispatch(setTypeDef({typeDef: SolrParameters.LUCENE}))
  }

  return (
    <>
      <Button
        className={classes.button}
        data-testid='relations'
        href=''
        onClick={handleChange}
        size="small"
        variant="contained"
      >
        <Link className={clsx(classes.leftIcon, classes.iconSmall)} />
        {t('relations')}
      </Button>
    </>
  )
}

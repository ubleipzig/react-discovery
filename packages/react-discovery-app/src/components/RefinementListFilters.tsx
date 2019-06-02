import React, {ReactElement} from "react"
import {ItemList} from "./ItemList"
import {getRefinementListFilters} from "@react-discovery/solr"
import {useTranslation} from "react-i18next"

export const RefinementListFilters: React.FC<any> = (): ReactElement => {
  const refinementListFilters = getRefinementListFilters()
  const {t} = useTranslation(['common', 'vocab'])
  const buildRefinementListFilters = (): ReactElement[] => {
    return Object.keys(refinementListFilters).map((id: any): ReactElement => (
      <ItemList
        field={refinementListFilters[id].field}
        key={id}
        label={t(`vocab:${refinementListFilters[id].label}`)}/>))
  }
  return (
    <>
    {buildRefinementListFilters()}
    </>)
}

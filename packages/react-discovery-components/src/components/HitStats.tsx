import {Box, Typography} from '@material-ui/core'
import React, {ReactElement} from "react"
import {getCollectionByKey, getCurrentCollection} from '@react-discovery/configuration'
import {ESCore} from "@react-discovery/core"
import {useTranslation} from 'react-i18next'

export const HitStats: React.FC<any> = (): ReactElement => {
  const numFound = ESCore.state.getNumFound()
  const currentCollection = getCurrentCollection()
  const currentCollectionObj = getCollectionByKey(currentCollection)
  const {t} = useTranslation()
  return (
    <Box
      data-testid='hit-stats'
      style={{flex: 'auto'}}>
      <Typography>
        {numFound} {t('resultsFound')} in {currentCollectionObj.name}
      </Typography>
    </Box>
  )
}


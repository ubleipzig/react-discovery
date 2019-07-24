import {Box, Typography} from '@material-ui/core'
import React, {ReactElement} from "react"
import {ESCore} from "@react-discovery/core"
import {useTranslation} from 'react-i18next'

export const HitStats: React.FC<any> = (): ReactElement => {
  const numFound = ESCore.state.getNumFound()
  const {t} = useTranslation()
  return (
    <Box
      data-testid='hit-stats'
      style={{flex: 'auto'}}>
      <Typography>
        {numFound} {t('resultsFound')}
      </Typography>
    </Box>
  )
}


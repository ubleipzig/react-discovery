import React, {ReactElement} from "react"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {getNumFound} from "@react-discovery/solr"
import {useTranslation} from 'react-i18next'

export const HitStats: React.FC<any> = (): ReactElement => {
  const numFound = getNumFound()
  const {t} = useTranslation()
  return (
    <Box style={{flex: 'auto'}}>
      <Typography>
        {numFound} {t('resultsFound')}
      </Typography>
    </Box>
  )
}


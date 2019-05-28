import React, {ReactElement} from "react"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {useSelector} from "react-redux"
import {useTranslation} from 'react-i18next'

export const HitStats: React.FC<any> = (): ReactElement => {
  const numFound = useSelector((state: any): number =>
    state.response.hits && state.response.hits.numFound)
  const {t} = useTranslation()
  return (
    <Box style={{flex: 'auto'}}>
      <Typography>
        {numFound} {t('resultsFound')}
      </Typography>
    </Box>
  )
}


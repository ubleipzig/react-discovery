import React, {ReactElement} from "react"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {connect} from "react-redux"

interface IHitStats {
  numFound: number;
}
const HitStatsComponent: React.FC<any> = (props: IHitStats): ReactElement => {
  const {numFound} = props
  return (
    <Box>
      <Typography>
        {numFound} results found
      </Typography>
    </Box>
  )
}

const mapStateToProps = (state): any => ({
  numFound: state.response.hits && state.response.hits.numFound
})

export const HitStats = connect(mapStateToProps, {})(HitStatsComponent)

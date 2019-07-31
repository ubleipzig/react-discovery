import {Badge, CardHeader, Theme, Tooltip, withStyles} from "@material-ui/core"
import {FlexBox, InnerHtmlValue} from "."
import {Link, useCurrentRoute} from 'react-navi'
import React, {ReactElement} from "react"
import {Star, StarBorder} from "@material-ui/icons"
import {ESCore} from "@react-discovery/core"
import {getRootContext} from "@react-discovery/configuration"
import {useDispatch} from 'react-redux'
import {useTranslation} from "react-i18next"

interface ITitleIdHeader {
  nodeCount?: number;
  title: string;
  id: string;
}

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  colorSecondary: {
    backgroundColor: '#46926c',
    color: theme.palette.secondary.contrastText,
  }
}))(Badge)

export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, nodeCount, title} = props
  const rootContext = getRootContext()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const dispatch = useDispatch()
  const {t} = useTranslation('common')

  const handleClick = (): void => {
    dispatch(ESCore.state.setFrom({from: 0}))
  }

  const buildStyledBadge = () => {
    return nodeCount > 0 ? (
      <StyledBadge
        badgeContent={nodeCount}
        color="secondary"
      > <Star fontSize='default' style={{padding: '5px'}}/>
      </StyledBadge>
    ) : <StarBorder fontSize='default' style={{padding: '5px'}}/>
  }

  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === rootContext) {
      return (
        <FlexBox>
          <Link
            data-testid='detail-link'
            href={`/detail/${id}`}
            onClick={handleClick}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
          <div style={{flexGrow: 1}}/>
          <Tooltip
            title={t('itemsInWorkspace')}>
            {buildStyledBadge()}
          </Tooltip>
        </FlexBox>
      )
    } else {
      return (
        <FlexBox>
          <Link
            href={`${rootContext}?q=${id}`}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
        </FlexBox>
      )
    }
  }

  return (
    buildTitleHeaderForPathName()
  )
}

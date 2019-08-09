import {FlexBox, InnerHtmlValue} from "."
import {Link, useCurrentRoute} from 'react-navi'
import React, {ReactElement} from "react"
import {CardHeader} from "@material-ui/core"
import {ESCore} from "@react-discovery/core"
import {getCurrentCollection, getCurrentSearchContext} from "@react-discovery/configuration"
import {useDispatch} from 'react-redux'

interface ITitleIdHeader {
  optionsMenu?: ReactElement;
  title: string;
  id: string;
}

export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, optionsMenu, title} = props
  const currentCollection = getCurrentCollection()
  const currentSearchContext = getCurrentSearchContext()
  const route = useCurrentRoute()
  const pathname = route.url.pathname

  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === currentSearchContext) {
      return (
        <FlexBox>
          <Link
            data-testid='detail-link'
            href={`/detail/${currentCollection}/${id}`}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
          <div style={{flexGrow: 1}}/>
          {optionsMenu}
        </FlexBox>
      )
    } else {
      return (
        <FlexBox>
          <Link
            href={`${currentSearchContext}?q=${id}`}
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

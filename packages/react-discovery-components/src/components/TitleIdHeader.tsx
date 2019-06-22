import {FlexBox, InnerHtmlValue} from "."
import {Link, useCurrentRoute} from 'react-navi'
import React, {ReactElement} from "react"
import {CardHeader} from "@material-ui/core"
import {SolrCore} from "@react-discovery/core"
import {getRootContext} from "@react-discovery/configuration"
import {useDispatch} from 'react-redux'

interface ITitleIdHeader {
  title: string;
  id: string;
}

export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, title} = props
  const rootContext = getRootContext()
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const dispatch = useDispatch()

  const handleClick = (): void => {
    dispatch(SolrCore.state.setStart({start: 0}))
    dispatch(SolrCore.state.setSuggest({stringInput: id, suggest: false}))
  }
  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === rootContext) {
      return (
        <FlexBox>
          <Link
            data-testid='detail-link'
            href={`detail/${id}`}
            onClick={handleClick}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
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

import {Link, useCurrentRoute} from 'react-navi'
import React, {ReactElement} from "react"
import {setStart, setSuggest} from "@react-discovery/solr"
import {CardHeader} from "@material-ui/core"
import {InnerHtmlValue} from "./InnerHtmlValue"
import {useDispatch} from 'react-redux'

interface ITitleIdHeader {
  title: string;
  id: string;
}
export const TitleIdHeader: React.FC<ITitleIdHeader> = (props): ReactElement => {
  const {id, title} = props
  const route = useCurrentRoute()
  const pathname = route.url.pathname
  const dispatch = useDispatch()

  const handleClick = (): void => {
    dispatch(setStart({start: 0}))
    dispatch(setSuggest({stringInput: id, suggest: false}))
  }
  const buildTitleHeaderForPathName = (): ReactElement => {
    if (pathname === '/') {
      return (
        <div style={{display: 'flex'}}>
          <Link
            data-testid='detail-link'
            href={`detail/${id}`}
            onClick={handleClick}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
        </div>
      )
    } else {
      return (
        <div style={{display: 'flex'}}>
          <Link
            href={`/?q=${id}`}
          >
            <CardHeader style={{width: '100%'}} title={<InnerHtmlValue value={title}/>}/>
          </Link>
        </div>
      )
    }
  }

  return (
    buildTitleHeaderForPathName()
  )
}

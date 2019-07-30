import {Badge, IconButton, Tab, Tabs, Theme, withStyles} from "@material-ui/core"
import {Book, ChatBubble, Image, Info} from "@material-ui/icons"
import {Domain} from "@react-discovery/views"
import React from "react"
import {buildEntityCountForType} from "@react-discovery/components"
import {useTranslation} from "react-i18next"
import {setItemViewType} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
    right: -3,
    top: '50%',
  },
  colorSecondary: {
    backgroundColor: '#46926c',
    color: theme.palette.secondary.contrastText,
  }
}))(Badge)

export const EntityBadges = (props) => {
  const dispatch = useDispatch()
  const {entities, id} = props
  const {t} = useTranslation('vocab')
  const [value, setValue] = React.useState(0);

  const handleChange = ({}, newValue: number) => {
    setValue(newValue);
  }

  const items = [
    {
      key: 0,
      type: 'info',
    },
    {
      key: 1,
      type: Domain.DIGITALISAT,
    },
    {
      key: 2,
      type: Domain.BESCHREIBUNG,
    },
    {
      key: 3,
      type: Domain.ANNOTATION,
    },
  ]

  const buildIconForEntityType = (type) => {
    switch (type) {
      case 'info':
        return <Info fontSize='default' style={{padding: '5px'}}/>
      case Domain.DIGITALISAT:
        return <Image fontSize='default' style={{padding: '5px'}}/>
      case Domain.BESCHREIBUNG:
        return <Book fontSize='default' style={{padding: '5px'}}/>
      case Domain.ANNOTATION:
        return <ChatBubble fontSize='default' style={{padding: '5px'}}/>
    }
  }

  const handleClick = (id, type) => {
    switch (type) {
      case Domain.DIGITALISAT:
        dispatch(setItemViewType({id, itemViewType: Domain.DIGITALISAT}))
        break
      case Domain.BESCHREIBUNG:
        dispatch(setItemViewType({id, itemViewType: Domain.BESCHREIBUNG}))
        break
      case Domain.ANNOTATION:
        dispatch(setItemViewType({id, itemViewType: Domain.ANNOTATION}))
        break
      default:
        dispatch(setItemViewType({id, itemViewType: 'info'}))
    }
  }
  const buildCardActions = (items) => {
    return items && items.map((item) => {
      return (
        <Tab
          href=''
          icon={
            <StyledBadge
              badgeContent={buildEntityCountForType(entities, item.type)}
              color="secondary"
            >
              {buildIconForEntityType(item.type)}
            </StyledBadge>
          }
          key={item.key}
          onClick={() => handleClick(id, item.type)}
          title={t(item.type)}
        />
      )
    })
  }
  return (
    <Tabs
      aria-label="icon tabs"
      indicatorColor="primary"
      onChange={handleChange}
      textColor="primary"
      value={value}
      variant="scrollable"
    >
      {buildCardActions(items)}
    </Tabs>
  )
}

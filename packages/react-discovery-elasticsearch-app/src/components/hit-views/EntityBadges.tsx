import {Badge, CardActions, Theme, withStyles} from "@material-ui/core"
import {Book, ChatBubble, Image} from "@material-ui/icons"
import {Domain} from "@react-discovery/views"
import React from "react"
import {buildEntityCountForType} from "@react-discovery/components"
import {useTranslation} from "react-i18next"

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
  const {entities} = props
  const {t} = useTranslation('vocab')

  const items = [
    {
      key: 0,
      type: Domain.DIGITALISAT,
    },
    {
      key: 1,
      type: Domain.BESCHREIBUNG,
    },
    {
      key: 2,
      type: Domain.ANNOTATION,
    },
  ]

  const buildIconForEntityType = (type) => {
    switch (type) {
      case Domain.DIGITALISAT:
        return <Image fontSize='default' htmlColor='#c7babade' style={{padding: '5px'}}/>
      case Domain.BESCHREIBUNG:
        return <Book fontSize='default' htmlColor='#c7babade' style={{padding: '5px'}}/>
      case Domain.ANNOTATION:
        return <ChatBubble fontSize='default' htmlColor='#c7babade' style={{padding: '5px'}}/>
    }
  }

  const buildCardActions = (items) => {
    return items && items.map((item) => {
      return (
        <CardActions
          disableSpacing
          key={item.key}
          title={t(item.type)}
        >
          <StyledBadge
            badgeContent={buildEntityCountForType(entities, item.type)}
            color="secondary"
          >
            {buildIconForEntityType(item.type)}
          </StyledBadge>
        </CardActions>
      )
    })
  }
  return (
    <>
      {buildCardActions(items)}
    </>
  )
}

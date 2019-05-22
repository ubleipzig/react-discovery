import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import React, {ReactElement} from "react"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"

interface IDefaultItemComponent {
  classes: any;
  hit: {};
  i: number;
  searchFields: any;
}

const DefaultHitComponent: React.FC<any> = (props: IDefaultItemComponent): ReactElement => {
  const {classes, hit, i, searchFields} = props

  const getRandomInt = (min, max): string => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInt = Math.floor(Math.random() * (max - min)) + min;
    return randomInt.toString()
  }

  const buildRandomUBLThumbnail = (): string => {
    const page = getRandomInt(1, 3).padStart(8, "0")
    const manifestId = getRandomInt(300, 12000).padStart(10, "0")
    const prefix = manifestId.substring(4, 8)
    return `https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/${prefix}/${manifestId}/${page}.jpx/full/170,/0/default.jpg`
  }

  const renderValue = (field, hit): ReactElement => {
    const {_source, highlighting} = hit
    const source = Object.keys(highlighting).length > 0 ? Object.assign({}, _source, highlighting) : _source
    const value = [].concat(source[field] || null).filter((v): any => v !== null);
    return (
      <div className={classes.values} dangerouslySetInnerHTML={{__html: value.join(", ")}}/>
    )
  }

  return (
    <Card className={classes.root} key={i}>
      <CardMedia
        alt="Placeholder"
        className={classes.cover}
        component="img"
        height="140"
        image={buildRandomUBLThumbnail()}
        title="Thumbnail"
      />
      <div className={classes.details}>
        {searchFields.map((field, key): ReactElement =>
          <CardContent
            className={classes.content}
            key={key}
          >
            <div style={{margin: "0 20px 0 10px", minWidth: 120}}>
              <Typography
                component="span"
              >
                {field.label || field.field}
              </Typography>
            </div>
            <div style={{flex: 'auto'}}>
              <Typography
                className={classes.inline}
                color="textSecondary"
                component="span"
              >
                {renderValue(field.field, hit)}
              </Typography>
            </div>
          </CardContent>)}
      </div>
    </Card>
  )
}

export default DefaultHitComponent

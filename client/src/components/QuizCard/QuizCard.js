import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'
import beach from '../../assets/beach.jpg'
import useStyles from './Style'

const QuizCard = (props) => {
  const classes = useStyles()
  let image = beach
  if(props.photo) {
    image = `data:image/png;base64,${props.photo}`
  }
  return (
    <Card>
      <CardActionArea onClick={props.function}>
        <CardMedia
          className={classes.image}
          image={image}
          title={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default QuizCard

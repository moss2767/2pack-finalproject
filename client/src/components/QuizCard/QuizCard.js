import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles, Typography } from '@material-ui/core'
import beach from '../../assets/beach.jpg'

const useStyles = makeStyles({
  media: {
    height: "25vh",
  },
})

const QuizCard = (props) => {
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea onClick={props.startGame}>
        <CardMedia
          className={classes.media}
          image={beach}
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
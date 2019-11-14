import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import beach from '../../assets/beach.jpg'

const useStyles = makeStyles({
  card: {
  },
  media: {
    height: "25vh",
  },
});

export default function QuizCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
  );
}
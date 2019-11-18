import React from 'react';
import { useDispatch } from 'react-redux'
import { correctAnswer, incorrectAnswer } from '../../../actions/actions'
import useStyles from './Style'
import { Button, Typography } from '@material-ui/core'

const Question = ({question}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const correctAnswerlol = question.answers.find(answer => answer.correct ==='true')
  shuffle(question.answers)
  
const handleAnswer = (answer) => {
  if (answer === correctAnswerlol.option) {
    alert("You were right!")
    dispatch(correctAnswer())
  } else {
    alert(`You were wrong! The correct answer was ${correctAnswerlol.option}`)
    dispatch(incorrectAnswer())
  }
}

  return (
    <div>
      <Typography className={classes.question} variant="h4">
        {question.question}
      </Typography>
      <div className={classes.answer}>
        { question.answers.map(answer => (
          <Button
            onClick={()=>handleAnswer(answer.option)}
            className={classes.answer}
            key={answer.option}
            size="large"
            color="primary"
            variant="contained">
              {answer.option}
          </Button>
        ))}
      </div>
    </div>
  );
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
 
export default Question;
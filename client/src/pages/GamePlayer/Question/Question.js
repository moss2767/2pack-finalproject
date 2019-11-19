import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { correctAnswer, incorrectAnswer } from '../../../actions/actions'
import useStyles from './Style'
import { Button, Typography } from '@material-ui/core'

const Question = ({question}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [disabled, setDisabled] = useState(false)
  const correct = question.answers.find(answer => answer.correct === 'true')

  useEffect(() => {
    setDisabled(false)
    shuffle(question.answers)
  }, [question])
  
  const handleAnswer = answer => {
    setDisabled(true)
    if (answer === correct.option) {
      dispatch(correctAnswer())
    } else {
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
            variant="contained"
            disabled={disabled}
            >
              {answer.option}
          </Button>
        ))}
      </div>
    </div>
  );
}

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
 
export default Question
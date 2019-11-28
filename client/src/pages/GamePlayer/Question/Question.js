import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendAnswerToServer } from '../../../actions/actions'

import { Button, Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './Style'

const Question = ({ question }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { answer, currentQuestionIndex, numberOfQuestions } = useSelector(state => state.game)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setDisabled(false)
    setChosenAnswer(null)
    shuffle(question.options)
  }, [question])

  useEffect(() => {
    if (answer) {
      const correctOption = document.querySelector(`.option-${answer.replace(/\W+/g, '')}`)
      correctOption.classList.add(classes.correct)
      if (chosenAnswer !== answer && chosenAnswer !== null) {
        const chosenOption = document.querySelector(`.option-${chosenAnswer.replace(/\W+/g, '')}`)
        chosenOption.classList.add(classes.incorrect)
      }
    }
  }, [answer, chosenAnswer, classes.correct, classes.incorrect])

  const handleAnswer = answer => {
    setDisabled(true)
    setChosenAnswer(answer)
    dispatch(sendAnswerToServer(answer))
  }

  return (
    <>
      <Paper className={classes.paperQuestion}>
        <Typography variant="h4">
          Question {currentQuestionIndex + 1} out of { numberOfQuestions}
        </Typography>
        <Typography variant="h4">
          {question.question}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        { question.options.map(option => (
          <Grid key={option} className={`option-${option.replace(/\W+/g, '')}`} item xs={12} sm={6}>
            <Button
              onClick={() => handleAnswer(option)}
              className={classes.option}
              size="large"
              color="primary"
              variant="contained"
              disabled={disabled}>
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
      {chosenAnswer === answer && chosenAnswer !== null && answer !== null && (
        <Typography className={classes.answerPrompt}> Correct! </Typography>
      )}
      {chosenAnswer !== answer && chosenAnswer !== null && answer !== null && (
        <Typography className={classes.answerPrompt}> Incorrect! </Typography>
      )}
      {chosenAnswer === null && answer !== null && (
        <Typography className={classes.answerPrompt}> You ran out of time! </Typography>
      )}
    </>
  )
}

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default Question

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
      const correctLol = document.querySelector(`.lol${answer}`)
      correctLol.classList.add(classes.correct)
      console.log('inside our stupid janky useEffect hook that sucks')
    }
  }, [answer, classes.correct])

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
          <Grid key={option} className={`lol${option}`} item xs={12} sm={6}>
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
      {answer && (
        <div>The answer is {answer}</div>
      )}
      {chosenAnswer === answer && chosenAnswer !== null && answer !== null && (
        <div>You answered correct and will get one point!</div>
      )}
      {chosenAnswer !== answer && chosenAnswer !== null && answer !== null && (
        <div>You answered incorrect!</div>
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

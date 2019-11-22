import React from 'react'
import { Button, Typography } from '@material-ui/core'
import useStyles from './Style'

const Question = ({ question }) => {
  const classes = useStyles()
  // const correctAnswer = question.answers.find(answer => answer.correct ==='true')
  shuffle(question.answers)

  return (
    <div>
      <Typography className={classes.question} variant="h4">
        {question.question}
      </Typography>
      <div className={classes.answer}>
        { question.answers.map(answer => (
          <Button className={classes.answer} key={answer.option} size="large" color="primary" variant="contained">{answer.option}</Button>
        ))}
      </div>
    </div>
  )
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default Question

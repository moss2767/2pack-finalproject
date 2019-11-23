import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './Style'

const Question = ({ question }) => {
  const classes = useStyles()
  shuffleOptions(question)

  return (
    <>
      <Paper className={classes.paperQuestion}>
        <Typography variant="h4">
          {question.question}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        { question.answers.map(answer => (
          <Grid key={answer.option} item xs={12} sm={6}>
            <Paper className={classes.paperAnswer}>
              <Typography className={classes.answer} variant="h5">
                {answer.option.toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const shuffleOptions = question => {
  for (let i = question.answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]]
  }
  return question
}

export default Question

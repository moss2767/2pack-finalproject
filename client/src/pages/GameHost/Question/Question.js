import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './Style'

const Question = ({ question }) => {
  const classes = useStyles()

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
                {answer.option}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Question

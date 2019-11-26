import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './Style'

const Question = ({ question }) => {
  const classes = useStyles()

  const { answer } = useSelector(state => state.game)

  useEffect(() => {
    if (answer) {
      const correctOption = document.querySelector(`.option-${answer.option}`)
      correctOption.classList.add(classes.correct)
      console.log('inside useEffect')
    }
  }, [answer])

  return (
    <>
      <Paper className={classes.paperQuestion}>
        <Typography variant="h4">
          {question.question}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        { question.answers.map(answer => (
          <Grid key={answer.option} className={`option-${answer.option}`} item xs={12} sm={6}>
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

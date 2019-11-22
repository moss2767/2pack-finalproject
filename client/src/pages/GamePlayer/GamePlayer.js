import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import Question from './Question/Question'
import { useHistory } from 'react-router-dom'
import { useStyles } from './Style'
import NavBar from '../../components/NavBar/NavBar'

const GamePlayer = () => {
  const classes = useStyles()
  const history = useHistory()
  const { gameStarted, question, quiz } = useSelector(state => state.game)
  const { name, points } = useSelector(state => state.user)

  useEffect(() => {
    if (quiz.questions[0].question !== null) {
      history.push('/result-player')
    }
  }, [history, quiz])

  return (
    <div className={classes.wrapper}>
      <NavBar />
      {!gameStarted && (
        <Typography className={classes.header} variant="h4">
          Waiting for host...
        </Typography>
      )}

      { gameStarted && (
        <div>
          <Typography>
            {name}: {points} points
          </Typography>
          <Question question={question}/>
        </div>
      )
      }

    </div>
  )
}

export default GamePlayer

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import Question from './Question/Question'
import { useHistory } from 'react-router-dom'
import { useStyles } from './Style'
import NavBar from '../../components/NavBar/NavBar'

const GamePlayer = () => {
  const classes = useStyles()
  let history = useHistory()
  const { gameStarted, question, questions } = useSelector(state => state.game)

  useEffect(() => {
    if(questions.length > 0) {
      history.push('/result-player')
      
    }
  }, [questions])

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
          <Question question={question}/>
          </div>
        ) 
      }

      {/* { !gameStarted && showCancel && (
        <div>
          <Typography className={classes.header} variant="h4">
           {countdown}...
          </Typography>
        </div>
      )} */}
    </div>
  )
}

export default GamePlayer
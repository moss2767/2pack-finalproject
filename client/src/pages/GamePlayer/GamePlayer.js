import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import Question from '../../components/Question/Question'
import { useStyles } from './GamePlayerStyle'

const GamePlayer = () => {
  const classes = useStyles()
  const [ gameStarted, setGameStarted ] = useState(false)
  const [ showCancel, setShowCancel ] = useState(false)
  const [ countdown, setCountdown ] = useState(3)

  return (
    <div>
      <Typography className={classes.header} variant="h4">
        Waiting for host...
        </Typography> 


    { !gameStarted && showCancel && (
        <div>
          <Typography className={classes.header} variant="h4">
           {countdown}...
          </Typography>
        </div>
      )}
{/* 
      { gameStarted && (
        currentQuestion !== questions.length && (
          <div>
          <Question question={questions[currentQuestion]}/>
          <p>Points: {points}</p>
          </div>
        ) 
      )} */}

    </div>
  )
}

export default GamePlayer
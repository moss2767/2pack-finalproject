import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import Question from '../../components/Question/Question'
import { useStyles } from './Style'
import NavBar from '../../components/NavBar/NavBar'

const GamePlayer = () => {
  const classes = useStyles()

  const { gameStarted, question } = useSelector(state => state.game)

  return (
    <div>
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
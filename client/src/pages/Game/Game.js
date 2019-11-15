import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions } from '../../actions/actions'
import io from 'socket.io-client'
import Question from '../../components/Question/Question'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "lighter",
    margin: "1rem 0"
  },
  button: {
    margin: "1rem",
    padding: "1rem",
    fontSize: "2rem",
  }
}))

const Game = () => {

  const classes = useStyles()
  const query = new URLSearchParams(useLocation().search)
  const quizId = query.get('id')
  const dispatch = useDispatch()
  const [ gameStarted, setGameStarted ] = useState(false)
  const [ showCancel, setShowCancel ] = useState(false)
  const [ countdown, setCountdown ] = useState(5)
  const [ countdownStarted, setCountdownStarted ] = useState(false)

  const socket = io('http://localhost:8000')

  socket.on('test', data => {
    console.log(data, 'it works')
  })

  useEffect(() => {
    if(!countdown) {
      console.log("Let's play!")
      setGameStarted(true)
      setCountdownStarted(false)
    }
    let intervalId
    if(countdownStarted) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [countdown, countdownStarted])

  const startGame = () => {
    setShowCancel(true)
    setCountdownStarted(true)
  }

  const cancelGame = () => {
    setShowCancel(false)
    setGameStarted(false)
    setCountdownStarted(false)
  }

  const currentQuestion = useSelector((state) => state.session.current)
  const points = useSelector((state) => state.session.points)
  
  useEffect(() => {
    fetch(`http://localhost:8000/quizzes/${quizId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(setQuestions(data))
      })
  }, [dispatch, quizId])

  const questions = useSelector((state) => {
    return state.questions
  })

  return (
    <div className="App">
      <NavBar />
      { !gameStarted && !showCancel && (
        <div>
          <Typography className={classes.header} variant="h4">
            Waiting for players to join...
          </Typography>
          <Button type="button" onClick={startGame} color="primary" variant="contained" className={classes.button}>
            Start Game
          </Button>
        </div>
      )}

      { !gameStarted && showCancel && (
        <div>
          <Typography className={classes.header} variant="h4">
           {countdown}...
          </Typography>
          <Button type="button" onClick={cancelGame} color="primary" variant="contained" className={classes.button}>
            Cancel
          </Button>
        </div>
      )}

      { gameStarted && (
        currentQuestion !== questions.length && (
          <div>
          <Question question={questions[currentQuestion]}/>
          <p>Points: {points}</p>
          </div>
        ) 
      )}
    </div>
  );
}
 
export default Game;
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions } from '../../actions/actions'
import Question from '../../components/Question/Question'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, Button } from '@material-ui/core'
import { useStyles } from './GameHostStyle'
import Scoreboard from '../../components/Scoreboard/Scoreboard'

const GameHost = () => {

  const users = useSelector((state) => state.users)

  const classes = useStyles()
  const query = new URLSearchParams(useLocation().search)
  const quizId = query.get('id')
  const dispatch = useDispatch()
  const [ gameStarted, setGameStarted ] = useState(false)
  const [ showCancel, setShowCancel ] = useState(false)
  const [ countdown, setCountdown ] = useState(3)
  const [ countdownStarted, setCountdownStarted ] = useState(false)

  useEffect(() => {
    console.log("SetPlayers")
  }, [])

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
  const code = useSelector((state) => state.session.room)
  
  useEffect(() => {

    const fetchQuiz = async () => {
      const res = await fetch(`http://localhost:8000/quizzes/${quizId}`)
      const data = await res.json()
      dispatch(setQuestions(data))
    }

    fetchQuiz()

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
          <Typography className={classes.header} variant="h4">
            Room code: {code}
          </Typography>
          <Button type="button" onClick={startGame} color="primary" variant="contained" className={classes.button}>
            Start Game
          </Button>
          
          <Typography className={classes.header} variant="h4">
          Connected Players
          </Typography>

          <Scoreboard {...{
            players: users
          }}/>

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
 
export default GameHost;
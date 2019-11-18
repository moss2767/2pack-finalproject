import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nextQuestion, startGame as startGameAction } from '../../actions/actions'
import Question from '../../components/Question/Question'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, Button } from '@material-ui/core'
import { useStyles } from './Style'
import Scoreboard from '../../components/Scoreboard/Scoreboard'

const GameHost = () => {

  const [questions, setQuestions] = useState('')
  const { currentQuestion, room, users } = useSelector(state => state.game)

  const classes = useStyles()
  const query = new URLSearchParams(useLocation().search)
  const quizId = query.get('id')
  const dispatch = useDispatch()
  const [ gameStarted, setGameStarted ] = useState(false)
  // const [ showCancel, setShowCancel ] = useState(false)
  // const [ countdown, setCountdown ] = useState(3)
  // const [ countdownStarted, setCountdownStarted ] = useState(false)

  // useEffect(() => {
  //   if(!countdown) {
  //     setGameStarted(true)
  //     setCountdownStarted(false)
  //   }
  //   let intervalId
  //   if(countdownStarted) {
  //     intervalId = setInterval(() => {
  //       setCountdown(countdown - 1)
  //     }, 1000)
  //   }
  //   return () => clearInterval(intervalId)
  // }, [countdown, countdownStarted, dispatch])

  const startGame = () => {
    setGameStarted(true)
    dispatch(nextQuestion(questions[currentQuestion]))
    dispatch(startGameAction())
    // setShowCancel(true)
    // setCountdownStarted(true)
  }

  // const cancelGame = () => {
  //   setShowCancel(false)
  //   setGameStarted(false)
  //   setCountdownStarted(false)
  // }

  const nextQuestionButton = () => {
    console.log('hey there lol')
    dispatch(nextQuestion(questions[currentQuestion]))
  }
  
  useEffect(() => {

    const fetchQuiz = async () => {
      const res = await fetch(`http://localhost:8000/quizzes/${quizId}`)
      const data = await res.json()
      setQuestions(data)
    }

    fetchQuiz()

  }, [dispatch, quizId])

  return (
    <div className="App">
      <NavBar />

      { !gameStarted && (
        <div>
          <Typography className={classes.header} variant="h4">
            Waiting for players to join...
          </Typography>
          <Typography className={classes.header} variant="h4">
            Room code: {room}
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

      {/* { !gameStarted && showCancel && (
        <div>
          <Typography className={classes.header} variant="h4">
           {countdown}...
          </Typography>
          <Button type="button" onClick={cancelGame} color="primary" variant="contained" className={classes.button}>
            Cancel
          </Button>
        </div>
      )} */}

      { gameStarted && (
        currentQuestion !== questions.length + 1 && (
          <div>
          <Question question={questions[currentQuestion - 1]}/>
        <Typography variant="h4"> Players that have answered: 10/{users.length}</Typography>
          <button onClick={nextQuestionButton}>
              Next question
          </button> 
          </div>
        ) 
      )}


    </div>
  );
}
 
export default GameHost;
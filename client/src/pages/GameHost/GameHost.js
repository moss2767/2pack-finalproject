import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nextQuestion, startGame as startGameAction, revealAnswer, sendQuestionsToServer } from '../../actions/actions'
import Question from './Question/Question'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useStyles } from './Style'
import Scoreboard from '../../components/Scoreboard/Scoreboard'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const GameHost = () => {
  let history = useHistory()
  const [questions, setQuestions] = useState([
    { answers: [ { correct: null, option: null } ] }
  ])
  
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [usersWhoHaveAnswered, setUsersWhoHaveAnswered] = useState(0)
  const { currentQuestion, room, users } = useSelector(state => state.game)

  const classes = useStyles()
  const query = new URLSearchParams(useLocation().search)
  const quizId = query.get('id')
  const dispatch = useDispatch()
  const [ gameStarted, setGameStarted ] = useState(false)

  useEffect(() => {

    const fetchQuiz = async () => {
      const res = await fetch(`${url}/quizzes/${quizId}`)
      const data = await res.json()
      setQuestions(data)
    }

    fetchQuiz()

  }, [dispatch, quizId])

  useEffect(() => {
    console.log(users)
    setUsersWhoHaveAnswered(users.reduce((total, adder) => {
      if(adder.answered) {
        return total + 1
      }
      return total
    }, 0))
  }, [users])

  useEffect(() => {
    // const correct = questions[currentQuestion].answers.find(answer => answer.correct === "true")
    // if(correct) {
    //   console.log(correct.option)
    //   setCorrectAnswer(correct.option)
    // }
  }, [currentQuestion, questions])
  
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
    dispatch(nextQuestion(questions[currentQuestion]))
  }

  const showResultsButton = () => {
    dispatch(sendQuestionsToServer(questions))
    history.push('/result')
  }

  const showAnswer = () => {
    dispatch(revealAnswer(correctAnswer.option))
  }

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
            <Typography variant="h4">{usersWhoHaveAnswered} / {users.length} have answered</Typography>
            {currentQuestion === questions.length && (
              <Button onClick={showResultsButton} className={classes.nextQuestion} size="large" color="primary" variant="contained"> 
              Show Results
              </Button>
             )}
            {currentQuestion !== questions.length && (
              <Button onClick={nextQuestionButton} className={classes.nextQuestion} size="large" color="primary" variant="contained">
                Next Question
              </Button>
            )}
            <Button onClick={showAnswer} className={classes.nextQuestion} size="large" color="primary" variant="contained">
              Show Answer
            </Button>
          </div>
        ) 
      )}
    </div>
  );
}
 
export default GameHost;
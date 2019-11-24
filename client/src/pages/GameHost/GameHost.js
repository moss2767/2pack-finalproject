import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendStartGameToServer, sendQuestionToServer, sendQuestionsToServer, tellServerToSendAnswer } from '../../actions/actions'

import { Button, Container, Typography } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'
import Question from './Question/Question'
import Scoreboard from '../../components/Scoreboard/Scoreboard'
import useStyles from './Style'

const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const GameHost = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const { room, users } = useSelector(state => state.game)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [quiz, setQuiz] = useState({ id: null, name: null, questions: [{ question: null, answers: [{ correct: null, option: null }] }] })
  const [usersWhoHaveAnswered, setUsersWhoHaveAnswered] = useState(0)

  const quizId = new URLSearchParams(useLocation().search).get('id')
  if (quizId === null) {
    history.push('/')
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/quizzes/${quizId}`)
      const data = await res.json()
      setQuiz(data)
    })()
  }, [quizId])

  useEffect(() => {
    setUsersWhoHaveAnswered(users.reduce((total, adder) => adder.answered ? total + 1 : total, 0))
    if (usersWhoHaveAnswered === users.length) {
      console.log('We should automatically show the answer to all players')
    }
  }, [dispatch, users, usersWhoHaveAnswered])

  const nextQuestionButton = () => {
    setCurrentQuestionIndex(value => {
      dispatch(sendQuestionToServer(quiz.questions[currentQuestionIndex + 1], value + 1))
      return value + 1
    })
  }

  const showResultsButton = () => {
    dispatch(sendQuestionsToServer(quiz))
    history.push('/result')
  }

  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="xl">

        { !gameStarted && (
          <div>
            <Typography className={classes.header} variant="h2">
            Waiting for players to join...
            </Typography>
            <Typography className={classes.header} variant="h4">
            Room code: {room}
            </Typography>

            <Button
              id="startGame"
              type="button"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                setGameStarted(true)
                dispatch(sendStartGameToServer(quiz.questions.length))
                dispatch(sendQuestionToServer(quiz.questions[currentQuestionIndex], currentQuestionIndex))
              }}>
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

        { gameStarted && (
          <div>
            <Question question={quiz.questions[currentQuestionIndex]}/>

            <Typography variant="h4">{usersWhoHaveAnswered} / {users.length} have answered</Typography>
            {currentQuestionIndex === quiz.questions.length - 1 && (
              <Button id="showResults" onClick={showResultsButton} className={classes.nextQuestion} size="large" color="primary" variant="contained">
              Show Results
              </Button>
            )}
            {currentQuestionIndex !== quiz.questions.length - 1 && (
              <Button id="nextQuestion" onClick={nextQuestionButton} className={classes.nextQuestion} size="large" color="primary" variant="contained">
                Next Question
              </Button>
            )}
            <Button
              onClick={() => dispatch(tellServerToSendAnswer(quiz.questions[currentQuestionIndex].answers.find(answer => answer.correct === true)))}
              className={classes.nextQuestion}
              size="large"
              color="primary"
              variant="contained">
              Show Answer
            </Button>
          </div>
        )}

      </Container>
    </div>
  )
}

export default GameHost

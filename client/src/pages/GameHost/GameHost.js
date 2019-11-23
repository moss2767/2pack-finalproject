import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nextQuestion, startGame, revealAnswer, sendQuestionsToServer, sendQuestionToPlayers } from '../../actions/actions'

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

  const { currentQuestion, room, users } = useSelector(state => state.game)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionToPlayers, setQuestionToPlayers] = useState({ question: null, options: [] })
  const [correctAnswer, setCorrectAnswer] = useState('')
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
  }, [dispatch, quizId])

  useEffect(() => {
    setUsersWhoHaveAnswered(users.reduce((total, adder) => adder.answered ? total + 1 : total, 0))
    if (usersWhoHaveAnswered === users.length) {
      console.log('We should automatically show the answer to all players')
    }
  }, [correctAnswer, dispatch, users, usersWhoHaveAnswered])

  useEffect(() => {
    const correct = quiz.questions[currentQuestion].answers.find(answer => answer.correct === 'true')
    if (correct) {
      setCorrectAnswer(correct.option)
    }
    setQuestionToPlayers({
      question: quiz.questions[currentQuestion].question,
      options: quiz.questions[currentQuestion].answers.map(answer => answer.option)
    })
  }, [currentQuestion, quiz])

  const showAnswer = () => dispatch(revealAnswer(correctAnswer))

  const nextQuestionButton = () => {
    dispatch(nextQuestion())
    console.log(questionToPlayers)
    dispatch(sendQuestionToPlayers(questionToPlayers))
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
                dispatch(sendQuestionToPlayers(questionToPlayers))
                dispatch(startGame(quiz.questions.length, currentQuestionIndex))
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
            <Question question={quiz.questions[currentQuestion]}/>

            <Typography variant="h4">{usersWhoHaveAnswered} / {users.length} have answered</Typography>
            {currentQuestion === quiz.questions.length - 1 && (
              <Button id="showResults" onClick={showResultsButton} className={classes.nextQuestion} size="large" color="primary" variant="contained">
              Show Results
              </Button>
            )}
            {currentQuestion !== quiz.questions.length - 1 && (
              <Button id="nextQuestion" onClick={nextQuestionButton} className={classes.nextQuestion} size="large" color="primary" variant="contained">
                Next Question
              </Button>
            )}
            <Button onClick={showAnswer} className={classes.nextQuestion} size="large" color="primary" variant="contained">
              Show Answer
            </Button>
          </div>
        )}

      </Container>
    </div>
  )
}

export default GameHost

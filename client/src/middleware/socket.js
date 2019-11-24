import io from 'socket.io-client'
import {
  setUsers, closeRoom, setQuestion, gameStarted, showAnswerToPlayer, setAllQuestionsToPlayers,
  CREATE_GAME, START_GAME, JOIN_GAME, SEND_ANSWER, SEND_QUESTION_TO_PLAYERS, SEND_QUESTIONS_TO_SERVER, SEND_ANSWER_TO_PLAYERS
} from '../actions/actions'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const socketMiddleware = state => {
  let socket = null
  if (!socket) {
    socket = io(url)
  }

  socket.on('users', data => {
    state.dispatch(setUsers(data))
  })

  socket.on('new question', ({ questionWithoutAnswer, currentQuestionIndex }) => {
    state.dispatch(setQuestion(questionWithoutAnswer, currentQuestionIndex))
  })

  socket.on('game started', numberOfQuestions => {
    state.dispatch(gameStarted(numberOfQuestions))
  })

  socket.on('answer', answer => {
    state.dispatch(showAnswerToPlayer(answer))
  })

  socket.on('all questions', quiz => {
    state.dispatch(setAllQuestionsToPlayers(quiz))
  })

  socket.on('room closing', () => {
    console.log('Room closing!')
    state.dispatch(closeRoom())
    // SEND USER BACK TO STARTING PAGE HERE
  })

  return next => action => {
    switch (action.type) {
      case CREATE_GAME: {
        socket.emit('join game as host', action.room)
        break
      }

      case JOIN_GAME: {
        socket.emit('join game', action)
        break
      }

      case START_GAME: {
        socket.emit('start game', action.numberOfQuestions)
        break
      }

      case SEND_QUESTION_TO_PLAYERS: {
        socket.emit('send question to players', { question: action.question, currentQuestionIndex: action.currentQuestionIndex })
        break
      }

      case SEND_ANSWER: {
        socket.emit('answer from player', action.answer)
        break
      }

      case SEND_ANSWER_TO_PLAYERS: {
        socket.emit('send answer to players')
        break
      }

      case SEND_QUESTIONS_TO_SERVER: {
        socket.emit('send questions', action.quiz)
        break
      }

      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware

import io from 'socket.io-client'
import {
  setUsers, closeRoom, sendStartGameToPlayers, sendQuestionToPlayers, sendAnswerToPlayers, setAllQuestionsToPlayers,
  CREATE_GAME, SEND_START_GAME_TO_SERVER, JOIN_GAME, SEND_QUESTIONS_TO_SERVER, SEND_ANSWER_TO_SERVER, TELL_SERVER_TO_SEND_ANSWER, SEND_QUESTION_TO_SERVER
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

  socket.on('send question to players', ({ questionWithoutAnswer, currentQuestionIndex }) => {
    state.dispatch(sendQuestionToPlayers(questionWithoutAnswer, currentQuestionIndex))
  })

  socket.on('send start game to players', numberOfQuestions => {
    state.dispatch(sendStartGameToPlayers(numberOfQuestions))
  })

  socket.on('send answer to players', answer => {
    state.dispatch(sendAnswerToPlayers(answer))
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

      case SEND_START_GAME_TO_SERVER: {
        socket.emit('send start game to server', action.numberOfQuestions)
        break
      }

      case SEND_QUESTION_TO_SERVER: {
        socket.emit('send question to server', { question: action.question, currentQuestionIndex: action.currentQuestionIndex })
        break
      }

      case SEND_ANSWER_TO_SERVER: {
        socket.emit('send answer to server', action.answer)
        break
      }

      case TELL_SERVER_TO_SEND_ANSWER: {
        socket.emit('tell server to send answer')
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

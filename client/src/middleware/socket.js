import io from 'socket.io-client'
import { setUsers, setQuestion, gameStarted, showAnswerToPlayer, setAllQuestionsToPlayers, CREATE_GAME } from '../actions/actions'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const socketMiddleware = state => {  
  let socket = null

  if(!socket) {
    socket = io(url)
  }

  socket.on('users', data => {
    state.dispatch(setUsers(data))
  })

  socket.on('new question', question => {
    state.dispatch(setQuestion(question))
    console.log("listening to question", question)
  })

  socket.on('game started', () => {
    state.dispatch(gameStarted())
  })

  socket.on('answer', answer => {
    // console.log('answer socket received!!', answer)
    state.dispatch(showAnswerToPlayer(answer))
  })

  socket.on('all questions', questions => {
    state.dispatch(setAllQuestionsToPlayers(questions))
  })

  return next => action => {


    switch(action.type) {

      case 'CORRECT_ANSWER': {
        socket.emit('correct answer')
        break
      }

      case 'REVEAL_ANSWER': {
        socket.emit('reveal answer', action.answer)
        break
      }

      case 'INCORRECT_ANSWER': {
        socket.emit('incorrect answer')
        break
      }
      
      case "NEW_USER": {
        socket.emit('new user', action.user)
        break
      }

      case CREATE_GAME: {
        socket.emit('join game as host', action.room)
        break
      }

      case "START_GAME": {
        socket.emit('start game')
        break
      }

      case "JOIN_GAME": {
        socket.emit('join game', action)
        break
      }

      case "SEND_QUESTION_TO_PLAYERS": {
        socket.emit('send question to players', action.question)
        break
      }

      case "SEND_QUESTIONS_TO_SERVER": {
        socket.emit('send questions', action.questions)
        break
      }

      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
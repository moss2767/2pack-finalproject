import io from 'socket.io-client'
import { setUsers, setQuestion, gameStarted } from '../actions/actions'

const socketMiddleware = state => {  
  let socket
  return next => action => {
    if(!socket) {
      socket = io('http://localhost:8000')
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

    switch(action.type) {
      
      case "NEW_USER": {
        socket.emit('new user', action.user)
        break
      }

      case "CREATE_GAME": {
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

      case "NEXT_QUESTION": {
        socket.emit('question', action.question)
        break
      }

      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
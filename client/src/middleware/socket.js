import io from 'socket.io-client'
import { setUsers } from '../actions/actions'

const socketMiddleware = state => {  
  let socket
  return next => action => {
    if(!socket) {
      socket = io('http://localhost:8000')
    }

    socket.on('users', data => {
      state.dispatch(setUsers(data))
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

      case "JOIN_GAME": {
        socket.emit('join game', action)
        break
      }

      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
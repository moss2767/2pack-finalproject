import io from 'socket.io-client'
import { setUsers, wrongCode } from '../actions/actions'

const socketMiddleware = state => {  
  let socket
  return next => action => {
    if(!socket) {
      socket = io('http://localhost:8000')
    }

    socket.on('users', data => {
      state.dispatch(setUsers(data))
    })
    
    socket.on('wrong code', () => {
      state.dispatch(wrongCode())
    })

    switch(action.type) {
      
      case "NEW_USER": {
        socket.emit('new_user', action.user)
        break
      }

      case "CREATE_GAME": {
        socket.emit('create_game', action.room)
        break
      }

      case "JOIN_GAME": {
        socket.emit('join room', action.room)
        break
      }

      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
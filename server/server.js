import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import socket from 'socket.io'

import leaderboard from './routes/leaderboard'
import questions from './routes/questions'
import createGame from './routes/createGame'
import login from './routes/login'
import quizzes from './routes/quizzes'
import joinGame from './routes/joinGame'
import listOfRooms from './routes/listOfRooms'

const app = express()
const server = http.Server(app)
const io = socket(server)
const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.use('/leaderboard', leaderboard)
app.use('/questions', questions)
app.use('/create-game', createGame)
app.use('/login', login)
app.use('/quizzes', quizzes)
app.use('/join-game', joinGame)
app.use('/list-of-rooms', listOfRooms)

const getUsers = () => {
  const clients = io.sockets.clients().connected
  const sockets = Object.values(clients)
  const users = sockets.filter(socket => socket.user).map(socket => socket.user)
  return users
}

const rooms = []
app.set('rooms', rooms)

const emitUsers = () => {
  console.log('getUsers', getUsers())
  io.emit('users', getUsers())
}

io.on('connection', socket => {
  console.log('Someone connected!')

  socket.on('join game as host', room => {
    socket.room = room
    socket.admin = true
    socket.join(room)
    socket.on('disconnect', () => {
      const roomIndex = rooms.indexOf(room)
      rooms.splice(roomIndex, 1)
      socket.emit('game over')
    })
  })

  socket.on('join game', action => {
    socket.room = action.room
    socket.join(action.room)
    socket.user = { name: action.name, points: 0 }
    emitUsers()
  })

  socket.on('disconnect', () => {
    console.log('User disconnected!')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

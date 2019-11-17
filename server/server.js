import cors from 'cors'
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
  const users = sockets.map(socket => socket.user)
  return users
}

const rooms = []
app.set('rooms', rooms)

const emitUsers = () => {
  io.emit('users', getUsers())
}

io.on('connection', socket => {
  console.log('Someone connected!')

  socket.on('new_user', user => {
    socket.user = user
    emitUsers()
  })

  socket.on('create_game', room => {
    rooms.push(room)
    socket.room = room
    socket.join(room)
  })

  socket.on('join room', room => {
    if (rooms.includes(room)) {
      socket.room = room
      socket.join(room)
    } else {
      socket.emit('wrong code')
    }
    console.log(rooms)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected!')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

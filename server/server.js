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

const getUsersInRoom = room => {
  const clients = Object.keys(io.sockets.adapter.rooms[room].sockets)
  const sockets = clients.map(client => io.sockets.connected[client])
  const users = sockets.filter(socket => socket.user).map(socket => socket.user)
  return users
}

const resetToNotAnswered = room => {
  const clients = Object.keys(io.sockets.adapter.rooms[room].sockets)
  const sockets = clients.map(client => io.sockets.connected[client])
  sockets.filter(socket => socket.user).forEach(socket => {
    socket.user.answered = false
  })
}

const rooms = []
app.set('rooms', rooms)

const emitUsers = room => {
  io.to(room).emit('users', getUsersInRoom(room))
}

io.on('connection', socket => {
  console.log('Someone connected!')

  socket.on('join game as host', room => {
    socket.admin = true
    socket.join(room)

    socket.on('question', question => {
      resetToNotAnswered(room)
      getUsersInRoom(room)
      socket.to(room).emit('new question', question)
    })

    socket.on('start game', () => {
      socket.to(room).emit('game started')
    })

    socket.on('disconnect', () => {
      const roomIndex = rooms.indexOf(room)
      rooms.splice(roomIndex, 1)
      socket.emit('game over')
    })

    socket.on('reveal answer', answer => {
      console.log('asdasdas', answer)
      socket.to(room).emit('answer', answer)
    })
  })

  socket.on('join game', action => {
    socket.room = action.room
    socket.join(action.room)
    socket.user = { id: socket.id, name: action.name, points: 0, answered: false }
    emitUsers(action.room)

    socket.on('correct answer', () => {
      socket.user.points = socket.user.points += 1
      socket.user.answered = true
      emitUsers(socket.room)
    })

    socket.on('incorrect answer', () => {
      socket.user.answered = true
      emitUsers(socket.room)
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected!')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

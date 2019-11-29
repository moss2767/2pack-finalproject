import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import socket from 'socket.io'

import leaderboard from './routes/leaderboard'
import createGame from './routes/createGame'
import login from './routes/login'
import quizzes from './routes/quizzes'
import listOfRooms from './routes/listOfRooms'

const app = express()
const server = http.Server(app)
const io = socket(server)
const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.use('/leaderboard', leaderboard)
app.use('/create-game', createGame)
app.use('/login', login)
app.use('/quizzes', quizzes)
app.use('/list-of-rooms', listOfRooms)

const getUsersInRoom = room => {
  if (io.sockets.adapter.rooms[room] !== undefined) {
    const clients = Object.keys(io.sockets.adapter.rooms[room].sockets)
    const sockets = clients.map(client => io.sockets.connected[client])
    const users = sockets.filter(socket => socket.user).map(socket => socket.user)
    return users
  }
  return [{ id: null, name: null, points: null, answered: null }]
}

const resetToNotAnswered = room => {
  const clients = Object.keys(io.sockets.adapter.rooms[room].sockets)
  const sockets = clients.map(client => io.sockets.connected[client])
  sockets.filter(socket => socket.user).forEach(socket => {
    socket.user.answered = false
  })
}

// We should use io.sockets.adapter.rooms instead and filter it
const rooms = []
app.set('rooms', rooms)

const emitUsers = room => {
  io.to(room).emit('users', getUsersInRoom(room))
}

io.on('connection', socket => {
  console.log(`Socket ID ${socket.id} connected`)

  socket.on('join game as host', room => {
    socket.room = room
    socket.host = true
    socket.join(room)

    socket.on('send start game to server', numberOfQuestions => {
      socket.to(room).emit('send start game to players', numberOfQuestions)
    })

    socket.on('send question to server', ({ question, currentQuestionIndex }) => {
      resetToNotAnswered(room)
      emitUsers(room)
      io.sockets.adapter.rooms[socket.room].answer = question.answers.find(answer => answer.correct === true).option
      const questionWithoutAnswer = {
        question: question.question,
        options: question.answers.map(answer => answer.option)
      }
      socket.to(room).emit('send question to players', { questionWithoutAnswer, currentQuestionIndex })
    })

    socket.on('tell server to send answer', () => {
      socket.to(room).emit('send answer to players', io.sockets.adapter.rooms[socket.room].answer)
    })

    socket.on('send questions', questions => {
      socket.to(room).emit('all questions', questions)
    })
  })

  socket.on('join game', action => {
    socket.room = action.room
    socket.player = true
    // if quiz in progress throw error or just dont join room 
    socket.join(action.room)
    socket.user = { id: socket.id, name: action.name, points: 0, answered: false }
    emitUsers(action.room)

    socket.on('send answer to server', answer => {
      socket.user.answered = true
      if (io.sockets.adapter.rooms[socket.room].answer === answer) {
        socket.user.points += 1
      }
      emitUsers(socket.room)
    })
  })

  socket.on('disconnect', () => {
    console.log(`Socket ID ${socket.id} disconnected`)
    if (socket.host) {
      console.log(`Host in room ${socket.room} disconnected, room closing...`)
      const roomIndex = rooms.indexOf(socket.room)
      rooms.splice(roomIndex, 1)

      socket.to(socket.room).emit('room closing')

      if (io.sockets.adapter.rooms[socket.room] !== undefined) {
        const clients = Object.keys(io.sockets.adapter.rooms[socket.room].sockets)
        const sockets = clients.map(client => io.sockets.connected[client])
        sockets.forEach(socket => {
          socket.leave(socket.room)
        })
      }
    }

    if (socket.player) {
      emitUsers(socket.room)
    }
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

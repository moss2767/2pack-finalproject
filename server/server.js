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

const app = express()
const server = http.Server(app)
const io = socket(server)
app.set('io', io)
const port = process.env.PORT || 8000

app.use(cors())

app.use('/leaderboard', leaderboard)
app.use('/questions', questions)
app.use('/create-game', createGame)
app.use('/login', login)
app.use('/quizzes', quizzes)
app.use('/join-game', joinGame)

io.on('connection', socket => {
  console.log('Someone connected!')
  io.emit('test', 'Hello World!')

  socket.on('disconnect', () => {
    console.log('Disconnected!')
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

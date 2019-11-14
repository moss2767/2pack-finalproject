import cors from 'cors'
import express from 'express'
import http from 'http'
import socket from 'socket.io'

import leaderboard from './routes/leaderboard'
import questions from './routes/questions'
import createGame from './routes/createGame'
import login from './routes/login'
import quizzes from './routes/quizzes'

const app = express()
const server = http.Server(app)
const io = socket(server)
const port = process.env.PORT || 8000

app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/leaderboard', leaderboard)
app.use('/questions', questions)
app.use('/create-game', createGame)
app.use('/login', login)
app.use('/quizzes', quizzes)

io.on('connection', socket => {
  io.emit('test', 'Hello World!')
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

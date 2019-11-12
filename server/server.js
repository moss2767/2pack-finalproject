import cors from 'cors'
import express from 'express'
import http from 'http'
import socket from 'socket.io'

import leaderboard from './routes/leaderboard'

const app = express()
const server = http.Server(app)
const io = socket(server)
const port = process.env.PORT || 8000

app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/leaderboard', leaderboard)

io.on('connection', socket => {
  io.emit('test', 'Hello World!')
})

server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

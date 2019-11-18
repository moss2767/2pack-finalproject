import express from 'express'
const router = express.Router()

router.post('/', (req, res) => {
  const rooms = req.app.get('rooms')
  const room = req.body.room
  console.log(req.body)
  if (rooms.includes(room)) {
    return res.status(400).json({
      message: 'Room already exists!'
    })
  }

  rooms.push(room)
  res.status(201).json({
    message: 'Room created!',
    room
  })
})

export default router

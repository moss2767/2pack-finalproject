import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  const rooms = req.app.get('rooms')
  res.status(200).json({
    rooms
  })
})

export default router

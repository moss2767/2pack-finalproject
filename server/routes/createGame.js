import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    todo: 'Fix this endpoint'
  })
})

export default router

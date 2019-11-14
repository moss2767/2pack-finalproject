import express from 'express'
const router = express.Router()

router.post('/', (req, res) => {
  const code = req.body.code
  console.log(code)
  // const io = req.app.get('io')
  res.status(200).json({
    todo: 'Fix this endpoint'
  })
})

export default router

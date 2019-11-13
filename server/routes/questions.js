import express from 'express'
import questions from '../questions.json'
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(questions)
})

export default router

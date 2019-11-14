import express from 'express'
import { getAllQuizzes, getQuiz } from '../database/queries'
const router = express.Router()

router.get('/', (req, res) => {
  getAllQuizzes(req, res)
})

router.get('/:id', (req, res) => {
  getQuiz(req, res)
})

export default router

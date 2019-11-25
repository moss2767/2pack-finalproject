import express from 'express'
import { createQuiz, getAllQuizzes, getQuiz } from '../database/queries'
const router = express.Router()

router.get('/', (req, res) => {
  getAllQuizzes(req, res)
})

router.get('/:id', (req, res) => {
  getQuiz(req, res)
})

router.post('/', (req, res) => {
  createQuiz(req, res)
})

export default router

import express from 'express'
import { addQuestion, createQuiz, deleteQuiz, getAllQuizzes, getQuiz } from '../database/queries.js'
import schemas from '../middleware/schemas.js'
import SchemaValidator from '../middleware/SchemaValidator.js'

const router = express.Router()

router.get('/', (req, res) => {
  getAllQuizzes(req, res)
})

router.get('/:id', (req, res) => {
  getQuiz(req, res)
})

router.post('/', SchemaValidator(schemas.createQuiz, 'body'), (req, res) => {
  createQuiz(req, res)
})

router.delete('/', SchemaValidator(schemas.deleteQuiz, 'body'), (req, res) => {
  deleteQuiz(req, res)
})

router.post('/add-question', SchemaValidator(schemas.newQuestion, 'body'), (req, res) => {
  addQuestion(req, res)
})

export default router

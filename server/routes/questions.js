import express from 'express'
import { getQuiz } from '../database/queries'
const router = express.Router()

router.get('/', (req, res) => {
  getQuiz(req, res)
})

export default router

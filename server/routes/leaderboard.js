import express from 'express'
import { AddEntryToLeaderboard, GetLeaderboard } from '../database/queries'
const router = express.Router()

router.get('/:id', (req, res) => {
  GetLeaderboard(req, res)
})

router.post('/', (req, res) => {
  AddEntryToLeaderboard(req, res)
})

export default router

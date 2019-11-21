import express from 'express'
import { AddOrUpdateLeaderboard, GetLeaderboard } from '../database/queries'
const router = express.Router()

router.get('/:id', (req, res) => {
  GetLeaderboard(req, res)
})

router.put('/', (req, res) => {
  AddOrUpdateLeaderboard(req, res)
})

export default router

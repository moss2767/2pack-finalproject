import express from 'express'
import { AddOrUpdateLeaderboard, GetLeaderboard } from '../database/queries'
import { checkJwt } from '../middleware/auth'
const router = express.Router()

router.get('/:id', (req, res) => {
  GetLeaderboard(req, res)
})

router.put('/', checkJwt, (req, res) => {
  console.log('req.user.name', req.user.name)
  AddOrUpdateLeaderboard(req, res)
})

export default router

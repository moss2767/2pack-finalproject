import express from 'express'
import { AddOrUpdateLeaderboard, GetLeaderboard } from '../database/queries.js'
import { checkJwt } from '../middleware/auth.js'
const router = express.Router()

router.get('/:id', checkJwt, (req, res) => {
  GetLeaderboard(req, res)
})

router.put('/', checkJwt, (req, res) => {
  console.log('req.user.name', req.user.name)
  AddOrUpdateLeaderboard(req, res)
})

export default router

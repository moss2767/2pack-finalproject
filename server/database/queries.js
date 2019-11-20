import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const hostName = process.env.NODE_ENV === 'dev' ? process.env.DB_HOST : `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: hostName,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
})

export const getQuiz = (req, res) => {
  const quizID = req.params.id
  pool.query('SELECT * FROM questions WHERE quiz_id = $1', [quizID], (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.status(200).json(results.rows)
  })
}

export const getAllQuizzes = (req, res) => {
  pool.query('SELECT * FROM quizzes', (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.status(200).json(results.rows)
  })
}

export const GetLeaderboard = (req, res) => {
  const quizId = req.params.id
  pool.query('SELECT * FROM leaderboards WHERE quiz_id = $1', [quizId], (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.status(200).json(results.rows)
  })
}

export const AddEntryToLeaderboard = (req, res) => {
  const quizId = req.body.id
  const batch = req.body.batch
  const percentage = req.body.percentage
  if (!quizId || !batch || !percentage) {
    return res.status(401).json({ message: 'Not all parameters' })
  }
  pool.query('SELECT leaderboard FROM leaderboards WHERE quiz_id = $1', [quizId], (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    const newLeaderboard = [...results.rows[0].leaderboard, { course: batch, percentage: percentage }]
    pool.query('UPDATE leaderboards SET leaderboard = $1', [JSON.stringify(newLeaderboard)], (error, results) => {
      if (error) {
        console.log('error updating', error)
        return res.status(500).json(error)
      }
    })
    res.status(201).json()
  })
}

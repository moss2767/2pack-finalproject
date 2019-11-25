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

export const createQuiz = (req, res) => {
  const name = req.body.name
  const description = req.body.description
  if (typeof name !== 'string' || typeof description !== 'string') {
    return res.status(400).json({ message: 'Need to submit a string name and string description in the body' })
  }

  pool.query('INSERT INTO quizzes (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error inserting quiz', error: error })
    }
    res.status(201).json()
  })
}

export const getQuiz = (req, res) => {
  const quizID = req.params.id
  const quiz = {}
  pool.query('SELECT question, answers FROM questions WHERE quiz_id = $1', [quizID], (error, results) => {
    if (error) {
      return res.status(500).json(error)
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'No quiz with that ID exists' })
    }
    quiz.questions = results.rows
    pool.query('SELECT name FROM quizzes WHERE id = $1', [quizID], (error, results) => {
      if (error) {
        return res.status(500).json({ message: `Error getting quiz with id ${quizID}`, error: error })
      }
      quiz.name = results.rows[0].name
      quiz.id = quizID
      return res.status(200).json(quiz)
    })
  })
}

export const getAllQuizzes = (_req, res) => {
  pool.query('SELECT * FROM quizzes', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting quizzes', error: error })
    }
    res.status(200).json(results.rows)
  })
}

export const GetLeaderboard = (req, res) => {
  const quizId = req.params.id
  pool.query('SELECT * FROM leaderboards WHERE quiz_id = $1', [quizId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting leaderboard', error: error })
    }
    res.status(200).json(results.rows)
  })
}

export const AddOrUpdateLeaderboard = (req, res) => {
  const { batch, percentage, quizId } = req.body

  if (typeof percentage !== 'number' && percentage <= 0 && percentage >= 100) {
    return res.status(400).json({ message: 'Percentage needs to be a number from 0 to 100' })
  }

  if (!quizId || !batch) {
    return res.status(400).json({ message: 'Error: Send in all required parameters' })
  }

  pool.query('SELECT leaderboard FROM leaderboards WHERE quiz_id = $1',
    [quizId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error getting leaderboard', error: error })
      }

      if (results.rows.length === 0) {
        return res.status(404).json({ message: 'No leaderboard with that ID found' })
      }

      const leaderboard = [...results.rows[0].leaderboard]
      const indexBatch = leaderboard.findIndex(entry => entry.batch === batch)

      if (indexBatch === -1) {
        leaderboard.push({ batch: batch, percentage: percentage })
      } else if (leaderboard[indexBatch].percentage < percentage) {
        leaderboard[indexBatch].percentage = percentage
      }

      pool.query('UPDATE leaderboards SET leaderboard = $1 WHERE quiz_id = $2',
        [JSON.stringify(leaderboard), quizId], (error, _results) => {
          if (error) {
            return res.status(500).json({ message: 'Error updating leaderboard', error: error })
          }
          res.status(204).send()
        })
    })
}

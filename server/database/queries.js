import pg from 'pg'
import dotenv from'dotenv'
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
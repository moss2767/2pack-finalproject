import pg from 'pg'
import dotenv from'dotenv'
dotenv.config()

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
})

export const getQuiz = (_req, res) => {
  pool.query('SELECT * FROM questions', (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json(error)
    }
    res.status(200).json(results.rows)
  })
}

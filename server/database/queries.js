import pg from 'pg'
import credentials from '../credentials.json'

const pool = new pg.Pool({
  user: credentials.user,
  host: credentials.host,
  database: credentials.database,
  password: credentials.OurPasswordForTheElephanSQLHostingOfOurPostgresDatabaseForOurFinalProjectWithSaltAreYouHappyNowAxel,
  port: credentials.port
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

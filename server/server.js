import express from 'express'

const app = express()

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
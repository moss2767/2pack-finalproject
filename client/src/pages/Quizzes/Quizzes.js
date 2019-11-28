import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, Container } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createGame } from '../../actions/actions'
import useStyles from './Style'

const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:8000'

const Quizzes = () => {
  const dispatch = useDispatch()
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/quizzes`)
      const data = await res.json()
      setQuizzes(data)
    })()
  }, [])

  const startGame = async id => {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    const res = await fetch(`${url}/create-game`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room: code })
    })
    const data = await res.json()
    if (data.room) {
      dispatch(createGame(data.room))
      history.push(`/play?id=${id}`)
    } else {
      alert('Room already exists. Try again!')
    }
  }

  const history = useHistory()
  const classes = useStyles()

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Typography className={classes.header} variant="h2">
          &lt;/salt&gt; quizzes
        </Typography>
        <Typography className={classes.subtitle} variant="h6">
        Select a quiz to host
        </Typography>
        <div className={classes.gamesContainer}>
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id}
              {...{
                header: quiz.name,
                text: quiz.description,
                function: () => { startGame(quiz.id) }
              }}/>
          ))}

        </div>
      </Container>
    </div>
  )
}

export default Quizzes

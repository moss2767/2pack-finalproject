import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, makeStyles, Container } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import { useHistory } from 'react-router-dom'
import './Quizzes.css'
import { useDispatch } from 'react-redux'
import { createGame } from '../../actions/actions'

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "lighter",
    margin: "1rem 0"
  },
  connectedPlayersHeader: {
    marginBottom: "0"
  }
}))

const Quizzes = () => {
  const dispatch = useDispatch()  
  const [quizzes, setQuizzes] = useState([])

  useEffect( () => {
    const test = async () => {
      const res = await fetch('http://localhost:8000/quizzes')
      const data = await res.json()
      setQuizzes(data)
    }
    test()
  }, [])

  const startGame = async (id) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    const res = await fetch('http://localhost:8000/create-game', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({room: code}) })
    const data = await res.json()
    if (data.room) {
      dispatch(createGame(data.room))
      history.push(`/play?id=${id}`)
    } else {
      alert('Room already exists. Try again!')
    }
  }
  
  let history = useHistory()
  const classes = useStyles()

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Typography className={classes.header} variant="h4">
          Salt Course quizzes
        </Typography>
        <div className="games-container">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id}
              {...{
              header: quiz.name,
              text: "Questions about callbacks",
              startGame: () => { startGame(quiz.id) }
            }}/>
          ))}
          
         
        </div>
      </Container>
    </div>
  );
}

export default Quizzes;
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, makeStyles, Container } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import { useHistory } from 'react-router-dom'
import './Quizzes.css'

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
  
  const [quizzes, setQuizzes] = useState([])

  useEffect( () => {
    const test = async () => {
      const res = await fetch('http://localhost:8000/quizzes')
      const data = await res.json()
      setQuizzes(data)
    }
    test()

    console.log(test)
  }, [])
  
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
            <QuizCard {...{
              header: quiz.name,
              text: "Questions about callbacks",
              startGame: () => { history.push(`/play?id=${quiz.id}`) }
            }}/>
          ))}
          
         
        </div>
      </Container>
    </div>
  );
}

export default Quizzes;
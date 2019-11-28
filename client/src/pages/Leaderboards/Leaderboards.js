import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import useStyles from './Style'
import QuizCard from '../../components/QuizCard/QuizCard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'

const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:8000'

const Leaderboards = () => {
  const history = useHistory()

  const classes = useStyles()
  const [quizzes, setQuizzes] = useState([])

  const showLeaderboard = (id) => {
    history.push(`/leaderboards/${id}`)
  }

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(`${url}/quizzes`)
      const data = await res.json()
      setQuizzes(data)
    }
    fetchQuizzes()
  }, [])

  return (
    <div>
      <NavBar />
      <Container className={classes.container}>

        <Typography className={classes.leaderboard} variant="h2">
        Leaderboards
        </Typography>
        <Typography className={classes.subtitle} variant="h6">
        Select quiz you want to see the leaderboard from
        </Typography>

        <Switch>
          {quizzes.map(quiz => (
            <Route key={quiz.id} path={`/leaderboards/${quiz.id}`}>
              <Leaderboard id={quiz.id}/>
            </Route>
          ))}
        </Switch>

        <div className={classes.gamesContainer}>
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id}
              {...{
                header: quiz.name,
                text: quiz.description,
                function: () => { showLeaderboard(quiz.id) }
              }}/>
          ))}
        </div>

      </Container>
    </div>
  )
}

export default Leaderboards

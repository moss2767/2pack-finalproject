import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Container, makeStyles, Typography } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const useStyles = makeStyles({
  leaderboard: {
    marginTop: "1rem"
  },
  subtitle: {
    margin: "1rem 0",
  },
  gamesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
  },
  container: {
    marginBottom: "2rem"
  }
})

const Leaderboards = () => {
  let history = useHistory()

  const classes = useStyles()
  const [quizzes, setQuizzes] = useState([])

  const showLeaderboard = (id) => {
    history.push(`/leaderboards/${id}`)
  }

  useEffect( () => {
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
        Select quiz you want to see the leaderboard from.
      </Typography>
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
    
    <Switch>
      {quizzes.map(quiz => (        
        <Route key={quiz.id} path={`/leaderboards/${quiz.id}`}>
          <Leaderboard id={quiz.id}/>
        </Route>
      ))}
    </Switch>

    </Container>
  </div>
   );
}
 
export default Leaderboards;
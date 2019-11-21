import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Container, makeStyles, Typography } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const useStyles = makeStyles({
  leaderboard: {
    marginTop: "1rem"
  },
  text: {
    marginTop: "1rem",
    marginBottom: "1rem"
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

const Leaderboards = ({ match }) => {
  let history = useHistory()

  const classes = useStyles()
  const dispatch = useDispatch()  
  const [quizzes, setQuizzes] = useState([])

  const showLeaderboard = (id) => {
    history.push(`/leaderboards/${id}`)
  }

  useEffect( () => {
    const test = async () => {
      const res = await fetch(`${url}/quizzes`)
      const data = await res.json()
      setQuizzes(data)
    }
    test()
  }, [])

  return ( 
  <div>
    <NavBar />
    <Container className={classes.container}>
      <Typography className={classes.leaderboard} variant="h2">
        Leaderboards
      </Typography>
      <Typography className={classes.text} variant="h6">
        Select quiz you want to see the leaderboard from.
      </Typography>
      <div className={classes.gamesContainer}>
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id}
              {...{
              header: quiz.name,
              text: quiz.description,
              startGame: () => { showLeaderboard(quiz.id) }
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
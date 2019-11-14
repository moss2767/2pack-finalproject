import React from 'react'
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
          <QuizCard {...{
            header: "Week 1 Day 1",
            text: "Questions about callbacks",
            startGame: () => { history.push('/play') }
          }}/>
          <QuizCard {...{
            header: "Week 1 Day 2",
            text: "Questions about promises",
            startGame: () => { history.push('/play') }
          }}/>
        </div>
      </Container>
    </div>
  );
}

export default Quizzes;
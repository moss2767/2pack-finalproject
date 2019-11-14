import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, makeStyles } from '@material-ui/core'
import QuizCard from '../../components/QuizCard/QuizCard'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "lighter",
    margin: "1rem"
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
      <div>
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
      </div>
    </div>
  );
}

export default Quizzes;
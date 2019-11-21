import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../components/NavBar/NavBar'
import { Avatar, Container, Typography } from '@material-ui/core'
import useStyles from './Style'
import Scoreboard from '../../components/Scoreboard/Scoreboard'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const HostResult = () => {
  const classes = useStyles()
  const { quiz, users } = useSelector(state => state.game)
  const maxPoints = quiz.questions.length * users.length
  const scoredPoints = users.reduce((total, user) => total + user.points, 0)
  const percentage = Math.round(scoredPoints/maxPoints * 100)

  const postLeaderboard = async () => {
    const res = await fetch(`${url}/leaderboard`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: quiz.id, batch: "Fall 19 - Stockholm", percentage: percentage.toString()})
    })
    if (res.status === 201) {
      alert("Score posted!")
    }
  }
  
  postLeaderboard()

  return (
  <div>
    <NavBar />
    <Container>
    <Typography className={classes.result} variant="h2">
      Result
    </Typography>
    <div className={classes.percentageAndTextWrapper}>
      <Avatar className={classes.percentage}>{percentage}%</Avatar>
      <Typography className={classes.text} variant="body1">
        <b>Insert batch name</b><br></br>
        You guys performed better than [insert percentage]% of other course batches. Well done!
      </Typography>
    </div>
    <Scoreboard {...{
      players: users
    }}/>
    </Container>
  </div>
   );
}
 
export default HostResult;
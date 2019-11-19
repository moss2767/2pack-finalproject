import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../components/NavBar/NavBar'
import { Avatar, Container, Typography } from '@material-ui/core'
import useStyles from './Style'
import Scoreboard from '../../components/Scoreboard/Scoreboard'

const HostResult = () => {
  const classes = useStyles()
  const { questions, users } = useSelector(state => state.game)
  const sortedUsers = users.sort((a, b) => b.points - a.points)
  const maxPoints = questions.length * users.length
  const scoredPoints = users.reduce((total, user) => total + user.points, 0)
  const percentage = Math.round(scoredPoints/maxPoints * 100)
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
    {/* <ol>
  {sortedUsers.map(user => (<li>{user.name}: {user.points}</li>))}
    </ol> */}
    </Container>
  </div>
   );
}
 
export default HostResult;
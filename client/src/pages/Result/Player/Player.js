import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { Typography, LinearProgress} from '@material-ui/core'
import { useSelector } from 'react-redux'
import useStyles from './Style'



const PlayerResult = () => {
  const classes = useStyles()
  const { quiz } = useSelector(state => state.game)
  const { name, points } = useSelector(state => state.user)

  const maxPoints = quiz.questions.length
  const percentageMaxPoints = (points / maxPoints) * 100 
  // arbitrarily picked 50 percent for differentiating between good and bad result 
  const resultQuality = percentageMaxPoints > 50
  
  return (
    <div>
      <NavBar />
      <Typography className={classes.result} variant="h2">  
        Result
      </Typography>
      <Typography className={classes.text} variant="body1">
        {resultQuality ? "Congrats" : "You might want to revisit the topic of this quiz"} {name}, you scored {points}, out of a possible {maxPoints} - {percentageMaxPoints}%
      </Typography>

      <LinearProgress className={classes.progressBar} variant="determinate" value={percentageMaxPoints} />
    </div>
  )
}

export default PlayerResult

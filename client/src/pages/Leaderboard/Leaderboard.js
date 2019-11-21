import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Container, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  leaderboard: {
    marginTop: "1rem"
  },
  text: {
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  container: {
    marginBottom: "2rem"
  }
})

const Leaderboard = () => {
  const classes = useStyles()

  return ( 
  <div>
    <NavBar />
    <Container className={classes.container}>
      <Typography className={classes.leaderboard} variant="h2">
        Leaderboard
      </Typography>
      <Typography className={classes.text} variant="h6">
        Select quiz you want to see the leaderboard from.
      </Typography>
    </Container>
  </div>
   );
}
 
export default Leaderboard;
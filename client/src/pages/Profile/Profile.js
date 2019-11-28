import React, { Fragment } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import NavBar from '../../components/NavBar/NavBar'
import { Typography } from '@material-ui/core'
import Scoreboard from '../../components/Scoreboard/Scoreboard'
import useStyles from './Style'

const Profile = () => {
  const { loading, user } = useAuth0()
  const classes = useStyles()
  if (loading || !user) {
    return <div>Loading...</div>
  }

  const mockData = {
    players: [{ name: 'Quiz 1', points: '45%' }, { name: 'Quiz 2', points: '65%' }, { name: 'Quiz 3', points: '95%' }],
    scores: 'something'
  }

  return (
    <Fragment>
      <NavBar />

      { (loading || !user) && (
        <div> Loading </div>
      )}

      { (!loading || user) && (
        <Fragment>
          <img className={classes.userImage} src={user.picture} alt="Profile" />

          <Typography className={classes.userInfo} >Username: {user.name}</Typography>
          <Typography className={classes.userInfo}> Account email: {user.email}</Typography>
          <Typography className={classes.userInfo}> Role: Administrator/Instructor</Typography>

          <Typography className={classes.userInfo} variant="h6"> Quiz History:</Typography>
          <Scoreboard {...mockData}></Scoreboard>
        </Fragment>
      )}

    </Fragment>
  )
}

export default Profile

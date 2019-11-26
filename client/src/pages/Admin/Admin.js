import React, { Fragment } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import NavBar from '../../components/NavBar/NavBar'
import { Typography, Container } from '@material-ui/core'
import useStyles from './Style'

const Admin = () => {
  const { loading, user } = useAuth0()
  const classes = useStyles()

  if (loading || !user) {
    return <div>Loading...</div>
  }



  return (
    <Fragment>
      <NavBar />

      <Container maxWidth="lg">

        { (loading || !user) && (
          <div> Loading </div>
        )}

        { (!loading || user) && (
          <Fragment>
            <Typography className={classes.header} variant="h2">Admin Panel</Typography>
            <Typography className={classes.subtitle} variant="h6">Add quizzes</Typography>
          </Fragment>
        )}
      </Container>

    </Fragment>
  )
}

export default Admin
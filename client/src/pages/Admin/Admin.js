import React, { Fragment } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import NavBar from '../../components/NavBar/NavBar'
import { Typography } from '@material-ui/core'

const Admin = () => {
  const { loading, user } = useAuth0()

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <NavBar />

      { (loading || !user) && (
        <div> Loading </div>
      )}

      { (!loading || user) && (
        <Fragment>
          <Typography variant="h2">Admin Panel</Typography>
          <Typography variant="h6">Add quizzes</Typography>
        </Fragment>
      )}

    </Fragment>
  )
}

export default Admin
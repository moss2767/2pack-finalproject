import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { joinGame } from '../../actions/actions'
import { useDispatch } from 'react-redux'

import { Button, Container, TextField } from '@material-ui/core'
import NavBar from '../../components/NavBar/NavBar'
import SimpleSnackbar from '../../components/SimpleSnackbar/SimpleSnackbar'

import classNames from 'classnames'
import useStyles from './Style'

const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:8000'

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('Room doesn\'t exist!')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const play = async event => {
    event.preventDefault()
    try {
      const res = await fetch(`${url}/list-of-rooms`)
      const data = await res.json()
      if (name.trim() === '') {
        setSnackbarMessage('Please input a name')
        setShowSnackbar(true)
      } else if (data.rooms.includes(code)) {
        dispatch(joinGame({ name, code }))
        history.push('/player')
      } else {
        setSnackbarMessage('Incorrect room code')
        setShowSnackbar(true)
      }
    } catch (err) {
      setSnackbarMessage("Server error - Can't get available rooms")
      setShowSnackbar(true)
    }
  }

  return (
    <div>
      <NavBar />
      <SimpleSnackbar open={showSnackbar} setOpen={setShowSnackbar} message={snackbarMessage}/>
      <Container className={classes.container}>

        <form className={classes.form} noValidate autoComplete="off" onSubmit={play}>
          <TextField
            id="Name"
            label="Name"
            required
            className={classes.FirstTextField}
            margin="normal"
            onChange={(event) => setName(event.target.value)}
            variant="outlined"/>

          <TextField
            id="Code"
            label="Code"
            className={classes.TextField}
            margin="normal"
            onChange={(event) => setCode(event.target.value)}
            variant="outlined"/>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}>
            Play
          </Button>
        </form>

        <Button
          id="hostButton"
          type="button"
          color="secondary"
          variant="contained"
          className={classNames(classes.button, classes.host)}
          onClick={() => history.push('/quizzes')}>
            Host a game
        </Button>

      </Container>
    </div>
  )
}

export default Home
